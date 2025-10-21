// required after updating the kotlin version

import org.jetbrains.kotlin.gradle.dsl.JvmTarget

plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
    // required for serialization
    //kotlin("plugin.serialization") version "2.2.20"
    id("org.jetbrains.kotlin.plugin.serialization") version "2.2.20"
}

android {
    namespace = "org.ll.mspa"
    compileSdk = 36

    defaultConfig {
        applicationId = "org.ll.mspa"
        minSdk = 24
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
//    kotlinOptions {
//        jvmTarget = "11"
//    }

    // required after updating the kotlin version
//    kotlin {
//        compilerOptions {
//            jvmTarget.set(JvmTarget.JVM_21)
//        }
//    }

    buildFeatures {
        compose = true
    }
}

dependencies {
// required for using icons
    //implementation("androidx.compose.material:material-icons-extended-android:1.6.7") // Or use the version catalog alias
    implementation("androidx.compose.material:material-icons-extended-android:1.7.8")
    // to use Jetpack viewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.9.4")
// to use Jetpack Navigation
    implementation("androidx.navigation3:navigation3-runtime:1.0.0-alpha11")
    implementation("androidx.navigation3:navigation3-ui:1.0.0-alpha11")
    // serialization
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-core:1.9.0")
// data storage
    implementation("androidx.datastore:datastore-preferences:1.1.7")
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.lifecycle.runtime.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.compose.ui)
    implementation(libs.androidx.compose.ui.graphics)
    implementation(libs.androidx.compose.ui.tooling.preview)
    implementation(libs.androidx.compose.material3)
    implementation(libs.androidx.ui.graphics)
    implementation(libs.androidx.datastore.core)
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
    androidTestImplementation(platform(libs.androidx.compose.bom))
    androidTestImplementation(libs.androidx.compose.ui.test.junit4)
    debugImplementation(libs.androidx.compose.ui.tooling)
    debugImplementation(libs.androidx.compose.ui.test.manifest)
}