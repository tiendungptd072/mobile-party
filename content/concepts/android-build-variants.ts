export const androidBuildVariantsConcept = {
  id: "android-build-variants",
  slug: "android-build-variants",
  title: "Android Build Variants and Merged Manifest",
  description:
    "Read the Android Gradle project behind both React Native and Compose, then verify variant inputs and release packaging.",
  category: "build",
  order: 8.75,
  aliases: [
    "Gradle",
    "build.gradle.kts",
    "sourceSets",
    "merged manifest",
    "debuggableVariants",
  ],
  keywords: [
    "Android Studio",
    "build type",
    "flavor",
    "release",
    "signing",
    "manifest merge",
  ],
  implementations: {
    "react-native": {
      name: "Build the Android host",
      summary:
        "The Android project under android/ uses Gradle and the React Native Gradle Plugin.",
      language: "bash",
      filename: "android/gradlew",
      code: `cd android
./gradlew :app:assembleDebug`,
    },
    kotlin: {
      name: "Build the Compose app",
      summary:
        "The app module uses the Android Gradle Plugin to assemble the selected variant.",
      language: "bash",
      filename: "gradlew",
      code: `./gradlew :app:assembleDebug`,
    },
  },
  relationships: [
    {
      from: "react-native",
      to: "kotlin",
      type: "similar",
      explanation:
        "Both Android projects assemble variants with Gradle. React Native adds a plugin that bundles JavaScript and assets for non-debuggable variants; Compose has no JavaScript bundle.",
    },
  ],
  mentalModel:
    "Android Studio opens the Gradle project. The app module combines a build type and optional product flavor into a variant; Gradle selects source sets, merges manifests and resources, and packages an artifact. React Native adds JavaScript bundling to this same Android pipeline.",
  differences: [
    "A React Native repository normally keeps its Android Gradle project in android/; a native Compose repository commonly opens the Android project at its root.",
    "Variant-specific src/<variant>/, src/<buildType>/, and src/<flavor>/ inputs take precedence over src/main/ when resources and manifests merge.",
    "In React Native, debuggableVariants skip shipping the JavaScript bundle and depend on Metro; marking a distributable variant debuggable can produce an unusable artifact.",
  ],
  commonMistakes: [
    "Editing only src/main/AndroidManifest.xml without checking the merged manifest for the variant being shipped.",
    "Treating a successful debug APK as proof that release signing, resources, and the React Native JavaScript bundle are correct.",
  ],
  productionNotes: [
    "Inspect the selected build variant and Merged Manifest view in Android Studio; run the sourceSets task when file ownership is unclear.",
    "Configure release signing before running apksigner, compare the printed certificate with the expected release key, and confirm a React Native release contains its JavaScript bundle. On Windows, use gradlew.bat instead of ./gradlew.",
  ],
} as const;
