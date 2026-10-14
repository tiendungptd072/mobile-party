import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    alias(libs.plugins.kotlin.serialization)
}

android {
    namespace = "party.mobile.verification"
    compileSdk = 35
    buildToolsVersion = "35.0.0"
    defaultConfig { minSdk = 23 }
    buildFeatures { compose = true }
    sourceSets["main"].java.srcDirs("../../../content/snippets", "../support")
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}

kotlin.compilerOptions {
    jvmTarget = JvmTarget.JVM_17
    optIn.addAll(
        "androidx.compose.material3.ExperimentalMaterial3Api",
        "androidx.compose.foundation.ExperimentalFoundationApi",
        "kotlinx.coroutines.ExperimentalCoroutinesApi",
        "androidx.paging.ExperimentalPagingApi",
    )
}

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.ui)
    implementation(libs.compose.foundation)
    implementation(libs.compose.material3)
    implementation(libs.compose.material.icons)
    implementation(libs.compose.ui.test)
    implementation(libs.activity.compose)
    implementation(libs.lifecycle.viewmodel)
    implementation(libs.lifecycle.runtime)
    implementation(libs.lifecycle.testing)
    implementation(libs.navigation.compose)
    implementation(libs.adaptive.layout)
    implementation(libs.adaptive.navigation)
    implementation(libs.window.core)
    implementation(libs.core)
    implementation(libs.fragment)
    implementation(libs.room.runtime)
    implementation(libs.room.ktx)
    implementation(libs.room.paging)
    implementation(libs.sqlite.bundled)
    implementation(libs.paging.compose)
    implementation(libs.work.runtime)
    implementation(libs.work.testing)
    implementation(libs.datastore)
    implementation(libs.biometric)
    implementation(libs.hilt)
    implementation(libs.hilt.navigation)
    implementation(libs.retrofit)
    implementation(libs.retrofit.serialization)
    implementation(libs.okhttp)
    implementation(libs.serialization)
    implementation(libs.coroutines)
    implementation(libs.coroutines.testing)
    implementation(libs.coil)
    implementation(libs.junit)
    implementation(libs.turbine)
    implementation(libs.android.test)
}
