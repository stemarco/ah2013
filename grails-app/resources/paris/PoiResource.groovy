package paris

import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.FormParam
import groovy.json.*

@Path('/api/poi')
class PoiResource {
    //TripAdvisorService tripAdvisorService
    def tripAdvisorService

    @POST
    @Produces('application/json')
    String getPoiRepresentation(@FormParam('data') String data) {
        def dataMap = new JsonSlurper().parseText(data);
        def poi = dataMap.id
    	tripAdvisorService.getReviews(poi)
    }
}
