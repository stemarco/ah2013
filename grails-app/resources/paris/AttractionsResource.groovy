package paris

import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.FormParam
import groovy.json.*


@Path('/api/attractions')
class AttractionsResource {
    //TripAdvisorService tripAdvisorService
    def tripAdvisorService

    @POST
    @Produces('application/json')
    String getAttractionsRepresentation(@FormParam('data') String data) {

        try {
          def dataMap = new JsonSlurper().parseText(data);
	  def cityId = dataMap.city
    	  def rv = tripAdvisorService.getAttractions(cityId)
	  println rv*.num_reviews
	  return rv
        } catch (ex) {
	  println ex
          return ex.message
        }
    }
}
