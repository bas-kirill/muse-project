package mu.muse.application

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@EnableAutoConfiguration
@Import(ApplicationConfiguration::class)
class Application

fun main(args: Array<String>) {
    runApplication<Application>(*args)
}
