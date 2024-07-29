package mu.muse.fitness

import com.tngtech.archunit.core.importer.ImportOption
import com.tngtech.archunit.core.importer.Location

class DoNotIncludeInfrastructure : ImportOption {
    override fun includes(location: Location): Boolean {
        return !location.contains("mu/muse/application/")
    }
}
