package paris

@Grab(group='com.gmongo', module='gmongo', version='1.2') 
import com.gmongo.GMongo 


import groovyx.net.http.RESTClient
import groovy.util.slurpersupport.GPathResult
import static groovyx.net.http.ContentType.URLENC

import static groovyx.net.http.ContentType.HTML
import groovy.util.slurpersupport.GPathResult
import grails.converters.JSON
import org.springframework.beans.factory.InitializingBean



class TripAdvisorService implements InitializingBean {

    def mongo = new GMongo("127.0.0.1", 27000 as Integer) 

    def apiKey = "ad15a48a-9e2d-4738-8f0e-cb75dd03dbbb"



    def cityIds = [
      boston: 60745,
      paris: 187147
    ]

    def cityAttractions = [
        187147: [],
        60745: []
      ]


    public void afterPropertiesSet() throws Exception {
       def serFile = new File("/tmp/tripadvisor.ser")
       cityAttractions = serFile.exists() ? deserialize(serFile) : initializeCityAttractions(serFile)
    }


  def getAttractions(cityId) {
     try {
       def data = cityAttractions[cityId] ?: fetchAttractions(cityId).data
       return data.sort { a, b -> b.num_reviews as Integer <=> a.num_reviews as Integer }.take(100)
     } catch (ex) {
       println ex
       return "Attractions for $cityId"
     }
  }

  /**
   * Get the first 50 reviews for a place of interest
   * Reviews are sorted by [default]
   */
  def getReviews(poi) {
    def data = fetchLocationReviews(poi).data
    return data
  }


  /**
   * Get 10 nearby attractions
   */
  def getNearby(lat, lon) {
      def data = _nearby(lat, lon) //fetchNearby(lat, lon).data
      return data.sort { a, b -> b.num_reviews as Integer <=> a.num_reviews as Integer }.take(10)
  }

  private def responseToList(json) {
    def jsonArray = json.data.getJSONArray("data")
    def objArray = jsonArray.toArray()
    println "returning ${objArray}"
    return objArray
  }

  private apiKey() { return apiKey }


  private fetchNearby(lat, lon, offset=0, client=null) {
    client = client ?: new RESTClient("https://api.tripadvisor.com/api/platform/1.0/map/${lat},${lon}/")
    try {
      def json = client.get(	
        path: 'attractions',
	query: [key:apiKey(), offset:offset, lunit: 'km', distance: 2]) // about 1/2 hr walking
      assert json.status == 200	     
      return [client:client, data:json.data.data, paging:json.data.paging]
    } catch (ex) {
      println ex
    }
  }

     
  /**	  
   * Get single attraction by location_id
   *  example: https://api.tripadvisor.com/api/platform/1.0/location/258705/reviews?key=ad15a48a-9e2d-4738-8f0e-cb75dd03dbbb
   */
   private fetchLocationReviews(id, offset=0, client=null) {

     client = client ?: new RESTClient("https://api.tripadvisor.com/api/platform/1.0/location/${id}/")	
     try {
       def json = client.get(
         path: 'reviews',
	 query: [key: apiKey(), offset:offset, limit:50])
	 assert json.status == 200
	 return  [client:client, data:json.data.data, paging: json.data.paging]
     } catch (ex) {
       pritnln ex
       return []
     }
   }

  /**
   * return {client:..., data:JSONArray, paging:JSONObject}
   */
  private fetchAttractions(id, offset=0, client = null) {
    client = client ?: new RESTClient("https://api.tripadvisor.com/api/platform/1.0/popular/${id}/")
      println client
		   try {
                     def json = client.get( 
 	               path : 'attractions', 
     	               query: [key: apiKey(), offset:offset, limit:50] )
                       assert json.status == 200
		       println json.getClass()
                       return [client:client, data:json.data.data, paging: json.data.paging]

 		    } catch (ex) {
     		      println ex
		      total = Integer.MAX_INT
   		    }

  }


    def deserialize(serFile) {
	return serFile.withObjectInputStream { ois -> ois.readObject() }
    }


    private _nearby(lat, lon) {
      
      def attractions = []
      def client = null
      Integer offset = 0	 
      Integer total = 0 
      while (! (offset> total)) {
		   println offset
		   def result = fetchNearby(lat, lon, offset, client)
		   client = result.client
		   attractions.addAll(result.data)
		   total = result.paging.total_results as Integer
		   offset += 50 //result.paging.results as Integer
		   sleep(50)
		}
 	return attractions

    }

    private initializeCityAttractions(serfile) {
    	    def attractions = [:]
    	    cityIds.each { city, id ->
	    attractions[id] = []
	    println "city: ${id}"
	        def client = null;
		Integer offset = 0
		Integer total = 0 
		while (! (offset> total)) {
		   println offset
		   def result = fetchAttractions(id, offset, client)
		   client = result.client
		   attractions[id].addAll(result.data)
//println result.paging
		   total = result.paging.total_results as Integer
		   offset += 50 //result.paging.results as Integer
		   sleep(500)
		}
 	
             } // each city          

        serfile.withObjectOutputStream { out -> out << attractions }	
	return attractions
    }
    
    def serviceMethod() {

    }
}


/*
	def iter = { start ->
		   try {
                     def json = client.get( 
 	               path : 'attractions', 
     	               query: [key: apiKey(), format: 'json', offset:start, limit:50] )

                       assert json.status == 200
                       attractions = responseToList(json)

 		    } catch (ex) {
     		      println ex
		      total = Integer.MAX_INT
   		    }
                }
*/