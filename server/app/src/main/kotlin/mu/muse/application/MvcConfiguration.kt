package mu.muse.application

import mu.muse.common.rest.GlobalErrorHandler
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class MvcConfiguration {

    @Bean
    fun globalExceptionHandler(): GlobalErrorHandler {
        return GlobalErrorHandler()
    }
}
