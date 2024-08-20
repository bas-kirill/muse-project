package mu.muse.fitness

import com.tngtech.archunit.core.importer.ImportOption.DoNotIncludeTests
import com.tngtech.archunit.junit.AnalyzeClasses
import com.tngtech.archunit.junit.ArchTest
import com.tngtech.archunit.lang.syntax.ArchRuleDefinition
import com.tngtech.archunit.library.Architectures

@AnalyzeClasses(
    packages = ["mu.muse"],
    importOptions = [
        DoNotIncludeTests::class,
        DoNotIncludeInfrastructure::class,
    ],
)
class CleanArchitectureGuard {

    @ArchTest
    @Suppress("VariableNaming")
    val `server must follow onion architecture` =
        Architectures.onionArchitecture()
            .domainModels("mu.muse.domain..")
            .domainServices("mu.muse.domain..")
            .applicationServices("mu.muse.usecase..")
            .adapter("persistence", "mu.muse.persistence..")
            .adapter("rest", "mu.muse.rest..")

    @ArchTest
    @Suppress("VariableNaming")
    val `server business logic should depends only on approved packages` = ArchRuleDefinition.classes()
        .that().resideInAnyPackage("mu.muse.domain..")
        .should().onlyDependOnClassesThat()
        .resideInAnyPackage(
            "mu.muse.domain..",
            "mu.muse.common..",
            "kotlin..",
            "java..",
            "org.jetbrains.annotations..",
        )
}
