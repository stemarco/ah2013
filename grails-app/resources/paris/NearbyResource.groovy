package paris


import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.FormParam
import groovy.json.*


@Path('/api/nearby')
class NearbyResource {
    def tripAdvisorService	

    @POST
    @Produces('application/json')
    String getNearbyRepresentation(@FormParam('data') String data) {

        try {
          def dataMap = new JsonSlurper().parseText(data);
    	  def rv = tripAdvisorService.getNearby(dataMap.lat, dataMap.lon)
	  println rv*.num_reviews
	  return rv
        } catch (ex) {
	  println ex
          return ex.message
        }
    }
}
