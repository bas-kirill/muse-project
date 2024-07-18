package mu.muse.application

import mu.muse.application.muse.RestConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@Import(
    RestConfiguration::class,
)
class ApplicationConfiguration
