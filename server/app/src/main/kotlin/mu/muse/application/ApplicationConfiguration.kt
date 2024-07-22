package mu.muse.application

import mu.muse.application.muse.PersistenceConfiguration
import mu.muse.application.muse.RestConfiguration
import mu.muse.application.muse.SecurityConfiguration
import mu.muse.application.muse.UseCaseConfiguration
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import

@Configuration
@Import(
    UseCaseConfiguration::class,
    PersistenceConfiguration::class,
    RestConfiguration::class,
    SecurityConfiguration::class,
    MvcConfiguration::class,
)
class ApplicationConfiguration
