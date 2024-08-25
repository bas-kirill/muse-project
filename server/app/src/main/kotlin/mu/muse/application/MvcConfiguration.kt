package mu.muse.application

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.ObjectMapper
import mu.muse.common.rest.GlobalErrorHandler
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
