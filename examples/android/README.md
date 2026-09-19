# Mobile Party Android Sample

Checkpoint 1. Compose list, state owner, Navigation Compose, visible UI test.

## Run

```powershell
cd examples/android
.\gradlew.bat testDebugUnitTest
.\gradlew.bat connectedDebugAndroidTest
```

`connectedDebugAndroidTest` needs running emulator or device. Install Android SDK Platform 35 first.

## Checkpoint sequence

1. Available: mock feed, ViewModel state, detail navigation, bookmark action, UI test.
2. Next: repository boundary and fake data test.
3. Next: Room local source of truth and offline persistence.
4. Next: Paging, WorkManager, notification, release checks.

Vietnamese: checkpoint 1 đã có feed giả lập, state trong ViewModel, Navigation Compose, thao tác bookmark và UI test. Các checkpoint sau sẽ thêm repository, Room, Paging, WorkManager và release checks.
