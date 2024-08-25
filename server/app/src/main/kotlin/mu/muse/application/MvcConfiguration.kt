package mu.muse.application

import mu.muse.rest.GlobalErrorHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MvcConfiguration {

//    @Bean
//    fun objectMapper(): ObjectMapper {
//        val objectMapper = ObjectMapper()
//        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL)
//        return objectMapper
//    }

    @Bean
    fun globalExceptionHandler(): GlobalErrorHandler {
        return GlobalErrorHandler()
    }
}
