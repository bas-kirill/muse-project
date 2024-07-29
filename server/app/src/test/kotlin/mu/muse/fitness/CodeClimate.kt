package mu.muse.fitness

import com.tngtech.archunit.core.importer.ImportOption.DoNotIncludeTests
import com.tngtech.archunit.junit.AnalyzeClasses
import com.tngtech.archunit.junit.ArchTest
import com.tngtech.archunit.library.dependencies.SlicesRuleDefinition.slices

@AnalyzeClasses(packages = ["mu.muse"], importOptions = [DoNotIncludeTests::class])
class CodeClimate {

    @ArchTest
    val `no cycle dependencies` = slices()
        .matching("mu.muse.(**)")
        .should()
        .beFreeOfCycles()
}
