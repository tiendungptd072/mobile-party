# Kế hoạch chuyển từ React Native sang Android

Tài liệu này theo dõi chương trình học React Native → Kotlin/Jetpack Compose. Đây là kế hoạch phát triển nội dung sau MVP; [roadmap giao sản phẩm](roadmap.md) ghi lại các phase xây website đã hoàn tất. Mỗi phiên làm việc cập nhật trạng thái, bằng chứng kiểm tra và việc còn lại tại đây.

## Đích đến và cách đo

- Junior: hoàn thành một tính năng nhỏ trên Android với hướng dẫn, giải thích được state và lifecycle.
- Middle: tự xây dựng tính năng xuyên suốt UI → ViewModel → repository → dữ liệu, xử lý lỗi và viết test.
- Senior: giải thích quyết định kiến trúc, điều tra lỗi nền tảng, đo hiệu năng và kiểm tra phát hành.
- Tốc độ chuyển đổi chỉ được đánh giá sau khi developer React Native thử làm bài thực hành. Số lesson và số test website không phải thước đo năng lực Android.

## Trạng thái giai đoạn

| Giai đoạn                      | Việc cần bàn giao                                                             | Trạng thái                |
| ------------------------------ | ----------------------------------------------------------------------------- | ------------------------- |
| 1. Kiểm tra nội dung           | Inventory, rà soát rủi ro, sửa ví dụ sai, EN/VI parity, issue register        | Hoàn thành rà soát tĩnh   |
| 2. Lộ trình theo trình độ      | Assessment đầu vào, prerequisite, tuyến junior/middle/senior và rubric        | Hoàn thành                |
| 3. Kiến thức Android thiết yếu | Platform, Coroutines/Flow, architecture/DI, data/offline, background, testing | Hoàn thành nội dung web   |
| 4. Dự án thực hành             | Starter, checkpoint, lời giải, build và test Android thật                     | Tạm dừng; sample tùy chọn |
| 5. Nhánh senior                | Bài toán architecture, migration, performance và release có rubric            | Đang thực hiện trên web   |
| 6. Kiểm chứng hiệu quả         | Kiểm tra hai nền tảng và thử nghiệm với người học React Native                | Chưa bắt đầu              |

## Giai đoạn 1: Kiểm tra nội dung

Phạm vi hiện tại: 53 concept/lesson, 159 stage với ví dụ React Native và Kotlin, 6 recipe, tuyến EN/VI và tài liệu tham khảo. Kiểm tra tự động xác nhận sự hiện diện, cấu trúc, thứ tự, reference và code giống nhau giữa các locale. Rà soát kỹ thuật tập trung vào code bất đồng bộ, lifecycle, navigation và nhãn Production; kiểm tra tự động không biên dịch snippet Android.

Các lỗi đã xác nhận và sửa:

| Mức | Vị trí                   | Vấn đề                                                                                                 | Kết quả                                                                      |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| P0  | Recipe gọi API           | `runCatching` biến cả coroutine cancellation thành UI error; lỗi kỹ thuật có thể đi thẳng vào UI state | Bắt và ném lại cancellation, dùng thông báo an toàn                          |
| P0  | Recipe phân trang        | Request lỗi để `isLoading` bị kẹt; gọi đồng thời có thể trùng request                                  | Có synchronous guard, `finally`, trạng thái append error và retry ở hai phía |
| P0  | Recipe deep link         | Dùng `!!` với route argument lấy từ URL; mẫu HTTPS thiếu phía Android                                  | Kiểm tra argument, hiển thị invalid-link state, khớp hai URI pattern         |
| P0  | Route parameter RN       | `useEffect` trả về Promise thay vì cleanup; request cũ có thể ghi state sau đổi route                  | Cleanup bằng abort và guard kết quả                                          |
| P1  | Async RN                 | Kết quả cũ có thể cập nhật state dù request đã abort nhưng data source không tuân thủ signal           | Guard kết quả sau abort                                                      |
| P1  | Recipe biometric Android | Callback đứng ngoài class nên snippet không có cấu trúc Kotlin hợp lệ                                  | Dùng `BiometricPrompt.AuthenticationCallback`                                |
| P1  | UI testing Production    | Chỉ chọn node bằng test tag, chưa test luồng bất đồng bộ                                               | Điều khiển callback lưu và kiểm tra trạng thái chờ/hoàn tất                  |

Rủi ro đã ghi nhận, chưa xem là đã giải quyết:

1. Các code block là đoạn minh họa. Chưa có Android project và React Native fixture để compile/test từng ví dụ, nên trạng thái "đúng kỹ thuật" hiện mới được xác nhận qua review và nguồn chính thức. Giai đoạn 4 phải thêm sample chạy được và CI.
2. Recipe refresh token chưa minh họa single-flight khi nhiều request nhận 401 cùng lúc; roadmap có ví dụ riêng. Cần hợp nhất thành một luồng thực hành ở giai đoạn 3–4.
3. Một số stage tên Production chỉ trình bày một lát cắt của yêu cầu production. Ưu tiên nâng ví dụ back navigation, secure storage và theme bằng tình huống kiểm chứng cụ thể ở giai đoạn 3–5.
4. Deep link production cần intent filter trong manifest và xác minh App Links. Recipe đã ghi chú; phần triển khai chạy được thuộc giai đoạn 4.
5. Chưa đo được thời gian hay mức tự chủ của người học. Giai đoạn 6 sẽ xây bài đánh giá và lấy dữ liệu thực tế.

Nguồn dùng khi kiểm tra API nhạy với hành vi: [Kotlin `runCatching`](https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/run-catching.html), [Android coroutines best practices](https://developer.android.com/kotlin/coroutines/coroutines-best-practices), [Compose test synchronization](https://developer.android.com/develop/ui/compose/testing/synchronization), [Android deep-link registration](https://developer.android.com/develop/ui/compose/sharing/receive) và [AndroidX `BiometricPrompt`](https://developer.android.com/reference/androidx/biometric/BiometricPrompt).

Điều kiện kết thúc giai đoạn: lỗi P0 đã xác nhận được sửa; cấu trúc EN/VI của toàn bộ concept và recipe đạt; lint, typecheck, test, build và `git diff --check` đạt; giới hạn kiểm chứng Android được ghi rõ.

## Giai đoạn 2: Lộ trình theo trình độ

Xây assessment đầu vào về Kotlin, lifecycle/state và async. Gắn prerequisite cho từng module và quy định nội dung được bỏ qua theo kết quả. Mỗi tuyến junior, middle, senior có một bài thực hành đầu ra với rubric về hành vi, kiến trúc, kiểm thử và khả năng giải thích. Nội dung mới có EN/VI tương đương.

Đã triển khai trên `/en/learn/react-native/kotlin` và `/vi/learn/react-native/kotlin`:

- Bốn bài tự đánh giá yêu cầu người học chứng minh Kotlin, Compose state/lifetime, async/cancellation và ranh giới architecture/testing. Chỉ đưa ra gợi ý sau khi đủ bốn câu trả lời. Lỗ hổng Kotlin/Compose dẫn đến tuyến Junior; lỗ hổng async/architecture dẫn đến Middle; đủ bốn năng lực dẫn đến Senior.
- Ba tuyến Android Junior/Middle/Senior có thứ tự bài đang xuất bản, điều kiện vào, bài thực hành đầu ra và rubric. Thâm niên React Native không tự quyết định tuyến Android.
- Mười module hiện có đều có prerequisite và bài kiểm tra để quyết định có thể đọc lướt mức Cơ bản/Áp dụng hay không. Người học vẫn phải làm bài thực hành trước khi đánh dấu hoàn thành.
- Tất cả nội dung này có bản EN/VI tương đương. Dự án chạy được và các phần Android còn thiếu được ghi rõ là mục tiêu của giai đoạn 3–4, không được giới thiệu như nội dung đã có.

Điều kiện kết thúc: người học xác định được điểm bắt đầu, thứ tự học và bằng chứng cần nộp để chuyển mức.

## Giai đoạn 3: Kiến thức Android thiết yếu

Bổ sung theo phụ thuộc: Android Studio/Gradle/Manifest/resources/Activity/Intent; Coroutines và Flow; ViewModel/repository/DI; Room/Paging/offline; WorkManager/notification; test ViewModel, data và navigation. Mỗi bài có đối chiếu React Native, ranh giới của phép so sánh, bài tập, lỗi thường gặp và nguồn chính thức. Không tăng số bài chỉ để tăng chỉ tiêu.

Tiến độ cụm nền tảng (2026-09-19): thêm năm bài `android-build-variants`, `android-app-entry`, `android-resources`, `android-intents` và `android-activity-lifecycle` vào trước UI component. Mỗi bài có ba cặp ví dụ Cơ bản/Áp dụng/Production, bài tập, checklist, bản EN/VI và nguồn chính thức. Nội dung phân biệt Android Gradle/build variant với bước đóng gói JavaScript của React Native, `AppRegistry` với Activity, lớp dịch JavaScript với Android resources, `Linking`/`Share` với Intent và AppState với lifecycle của Activity/màn hình. Đã đưa năm bài vào tuyến Junior. Đây mới là phần đầu của giai đoạn 3, chưa phải hoàn thành nền tảng Android.

Tiến độ cụm bất đồng bộ (2026-09-19): thêm `coroutine-scopes` và `flow-and-stateflow` sau bài Async Work, đồng thời đưa vào tuyến Middle. Bài đầu làm rõ owner của Job, hủy request cũ, kết quả đến muộn và `CancellationException`; bài sau phân biệt Flow cold với StateFlow hot, vòng đời subscriber, `stateIn` và `collectAsStateWithLifecycle`. Cả hai có ba cặp ví dụ tăng dần, EN/VI, bài tập, checklist và nguồn chính thức.

Tiến độ cụm kiến trúc (2026-09-19): thêm `repository-boundary` và `dependency-injection` trước Authentication trong App Architecture, đồng thời đưa vào tuyến Middle. Nội dung tách data source khỏi ViewModel/UI, map DTO tại repository, dùng fake trong state-owner test, constructor injection, manual DI và Hilt theo độ phức tạp của dependency graph. Mỗi bài có ba cặp ví dụ EN/VI, bài tập, checklist và nguồn chính thức.

Tiến độ cụm dữ liệu offline (2026-09-19): thêm `offline-first-data` sau DI trong App Architecture và tuyến Middle. Bài dùng Room entity/DAO `Flow`, local source of truth, repository refresh, mapping network/entity/domain, transaction và tiêu chí chọn queued write. Mỗi phần có ba cặp ví dụ EN/VI, bài tập, checklist và nguồn Android chính thức.

Tiến độ cụm offline pagination (2026-09-19): thêm `offline-pagination` sau Offline-first Data và vào tuyến Middle. Bài phân biệt callback cuối danh sách với local `PagingSource`, `RemoteMediator`, `LoadType`, remote key, transaction và recovery tách biệt cho refresh/append. Mỗi phần có ba cặp ví dụ EN/VI, bài tập, checklist và nguồn Android chính thức.

Tiến độ cụm công việc nền (2026-09-19): thêm `durable-background-work` và `android-notifications` sau Offline Pagination trong App Architecture và tuyến Middle. Bài đầu đối chiếu Headless JS với WorkManager, điều kiện mạng, unique work, idempotency và retry. Bài sau giải thích native bridge, notification channel, quyền `POST_NOTIFICATIONS`, xử lý từ chối và tap destination. Cả hai có ba cặp ví dụ EN/VI, bài tập, checklist và nguồn chính thức.

Tiến độ cụm Flow/test (2026-09-19): thêm `flow-composition` sau Flow and StateFlow trong Async/Networking và `state-owner-testing` trong App Architecture, cả hai vào tuyến Middle. Bài Flow dùng `combine`, retry có giới hạn, error state và test cập nhật hai nguồn. Bài testing tách fake repository/ViewModel test khỏi Room integration test, dùng `runTest`, test dispatcher và collector khi `stateIn` có `WhileSubscribed`. Mỗi bài có ba cặp ví dụ EN/VI, bài tập, checklist và nguồn chính thức.

Tiến độ cụm integration test (2026-09-19): thêm `navigation-testing` và `background-work-testing` vào App Architecture/tuyến Middle. Bài navigation test bám theo thao tác người dùng, UI mở ở đích, route ID, timer animation và trường hợp route không hợp lệ. Bài WorkManager tách worker unit test khỏi scheduler integration test, phân biệt `Result.retry()`/`Result.failure()` và dùng `TestListenableWorkerBuilder`, `WorkManagerTestInitHelper`, `TestDriver` không chờ thời gian thật. Những ví dụ trước đó đã bao phủ cancellation và failure state từ UI → ViewModel → repository; các bài mới bổ sung điểm kiểm chứng ở navigation và durable work.

Giai đoạn 3 đã hoàn thành ở phạm vi nội dung web. Kotlin/Jetpack Compose snippets là nội dung so sánh hiển thị trên website; chúng không phải Android project chạy trong repository.

Điều kiện kết thúc: các bài mới có EN/VI tương đương, ví dụ theo ba mức và test nội dung đạt.

## Giai đoạn 4: Dự án mẫu native

Đã loại bỏ `examples/android/` và workflow Android CI. Repository chỉ phục vụ website; không yêu cầu Gradle, Android SDK, emulator, native build hoặc native CI để dùng và phát hành website.

## Giai đoạn 5: Nhánh senior

Bài tập về ranh giới module, dependency scope, race condition, process recreation, migration View/XML ↔ Compose, profiling, signing và release. Rubric đánh giá quyết định và bằng chứng, không ép một đáp án kiến trúc duy nhất.

Tiến độ web (2026-09-20): thêm `feature-module-boundaries` và `refresh-bookmark-races` vào App Architecture và tuyến Senior; đào sâu `state-restoration` đã có thay vì tạo bài trùng. Bài race condition tách dữ liệu server khỏi bookmark cục bộ và kiểm thử hai thứ tự sự kiện. Bài restoration phân biệt rotation, system-initiated process death và force-stop; nêu quy trình kiểm tra bằng `adb shell am kill`, điều kiện giữ route ID của React Native, SavedStateHandle và việc tải lại domain data. Có ví dụ ba mức, bài tập, checklist, nguồn chính thức và bản EN/VI tương đương. 72 concept/lesson, 216 stage; 60 test, lint, typecheck và build 690 trang đạt. Còn migration View/XML ↔ Compose, profiling và release; quy trình process death chưa chạy trên thiết bị, snippet chưa được biên dịch độc lập bằng Android toolchain hoặc thử nghiệm với người học. Ví dụ race condition xử lý state trong bộ nhớ; chính sách đồng bộ bookmark bền vững vẫn là bài tập thiết kế.

Điều kiện kết thúc: có thể review một lời giải và chỉ rõ correctness, khả năng kiểm thử, trade-off và dữ liệu đo lường.

## Giai đoạn 6: Kiểm chứng hiệu quả

Website chạy lint, typecheck, test, build và kiểm tra EN/VI. Người học làm bài thực hành trong dự án riêng. Cho developer React Native ở các mức khác nhau thử một tính năng, ghi lại thời gian hoàn thành, lỗi, số lần cần trợ giúp và khả năng tự giải thích. Sửa thứ tự và độ sâu bài học theo kết quả.

Điều kiện kết thúc: có bằng chứng thực nghiệm để đánh giá lời hứa "chuyển đổi nhanh" và mức năng lực thực tế.

## Nhật ký

- 2026-09-20: Xóa `examples/android/` và workflow Android CI. Repository chỉ chứa website; Kotlin/Jetpack Compose snippets tiếp tục hiển thị như nội dung học trên web.
- 2026-09-20: Đào sâu bài `state-restoration` EN/VI ở giai đoạn 5: thêm ranh giới navigation state của React Native, process death của Android, quy trình `adb shell am kill` và lỗi kiểm thử thường gặp. Giữ 72 concept/216 stage; 60 test, lint, typecheck, build 690 trang đạt. Chưa chạy quy trình trên thiết bị; Android sample không thay đổi.
- 2026-09-20: Tiếp tục giai đoạn 5 trên website bằng `refresh-bookmark-races` EN/VI. Ba mức ví dụ đi từ state ownership tới reducer và test thứ tự sự kiện. 72 concept, 216 stage, 59 test, lint, typecheck, build 690 trang đạt. Android sample không thay đổi.
- 2026-09-20: Bắt đầu giai đoạn 5 trên website bằng bài ranh giới module tính năng EN/VI và ví dụ ba mức. 71 concept, 213 stage, 58 test, lint, typecheck, build 681 trang đạt. Android sample tạm dừng, chỉ là phần thực hành tùy chọn.
- 2026-09-20: Thêm CI Android build/unit test; chưa xác nhận run trên GitHub. Thử Room Plugin, pin serialization trong KSP và KSP2 nhưng schema export vẫn lỗi; đã hoàn nguyên cấu hình thử nghiệm. Còn chạy test trên thiết bị, phân trang mạng và migration.
- 2026-09-20: Thêm tìm kiếm cục bộ trên Room Paging, trạng thái rỗng EN/VI và bỏ snapshot đầy đủ khỏi ViewModel. 17 unit test cùng hai APK build đạt. Còn test trên thiết bị, phân trang mạng và sửa Room schema export.
- 2026-09-20: Tiếp tục checkpoint 5 với WorkManager đồng bộ một lần, chính sách retry có giới hạn và UI EN/VI. 16 unit test và hai APK build đạt. Còn chạy test trên thiết bị, phân trang mạng, tìm kiếm và sửa Room schema export.
- 2026-09-20: Bắt đầu checkpoint 5 với phân trang Room cục bộ và UI Paging 3, hướng dẫn EN/VI. 12 unit test cùng APK app/test build đạt; chưa có WorkManager, remote paging hay test trên thiết bị. Ghi nhận vấn đề Room/KSP schema export và tạm tắt export; phải giải quyết trước giai đoạn test/release.
- 2026-09-20: Hoàn thành mã checkpoint 4 giai đoạn 4: Room làm local source of truth, cache mở app, bookmark bền vững, test và hướng dẫn EN/VI. 11 unit test cùng hai APK build thành công. Còn cần chạy instrumentation/offline scenario trên thiết bị. Bước tiếp theo: Paging và WorkManager.
- 2026-09-20: Tiếp tục giai đoạn 4 với checkpoint 3: HTTP source, retry có giới hạn, cancellation, trạng thái tải/lỗi và nhãn EN/VI cho Android sample. `testDebugUnitTest`, `assembleDebug` và `assembleDebugAndroidTest` đạt; chưa có emulator hoặc thiết bị để chạy UI test. Bước tiếp theo: Room làm local source of truth.
- 2026-09-20: Hoàn thành checkpoint 2 của giai đoạn 4: repository boundary, constructor injection, fake data source, loading/failure state và ViewModel unit test. `testDebugUnitTest` đạt. Chưa có emulator hoặc thiết bị nên `connectedDebugAndroidTest` chưa chạy. Bước tiếp theo: network source, cancellation và retry.
- 2026-09-19: Bắt đầu giai đoạn 4. Thêm Android sample chạy được tại `examples/android/`, gồm checkpoint 1 cho UI giả lập, state owner, Navigation Compose, bookmark và test. Gradle Wrapper 8.13 cùng `testDebugUnitTest` đạt; không có thiết bị/emulator nên chưa chạy `connectedDebugAndroidTest`. Bước tiếp theo: repository boundary, fake data source và state test.
- 2026-09-19: Hoàn thành nội dung web giai đoạn 3 với `navigation-testing` và `background-work-testing`. Tổng cộng 70 concept/lesson và 210 stage; EN/VI parity, 57 test, lint, typecheck và build 672 trang tĩnh đạt. Bài mới test navigation theo hành vi người dùng và test WorkManager bằng TestDriver, không cần chờ thời gian thật; các snippet Android chưa được biên dịch bằng Gradle. Bước tiếp theo: giai đoạn 4, Android sample chạy được và checkpoint.
- 2026-09-19: Tiếp tục giai đoạn 3 với `flow-composition` và `state-owner-testing`. Tổng cộng 68 concept/lesson và 204 stage; EN/VI parity, 56 test, lint, typecheck và build 654 trang tĩnh đạt. Ví dụ `renderHook` đã cập nhật theo API async của React Native Testing Library 14. Các snippet Android chưa được biên dịch bằng Gradle; bước tiếp theo: test navigation/WorkManager và đường đi lỗi xuyên các layer.
- 2026-09-19: Tiếp tục giai đoạn 3 với `durable-background-work` và `android-notifications`. Tổng cộng 66 concept/lesson và 198 stage; EN/VI parity, 55 test, lint, typecheck, build 636 trang tĩnh và `git diff --check` đạt. Các snippet Android chưa được biên dịch bằng Gradle; bước tiếp theo: Flow nâng cao và test ViewModel/data/navigation/WorkManager.
- 2026-09-19: Tiếp tục giai đoạn 3 với `offline-pagination`: local `PagingSource`, `RemoteMediator`, refresh/append, remote key và transaction. Tổng cộng 64 concept/lesson và 192 stage; EN/VI parity, 54 test, lint, typecheck, build 618 trang tĩnh và `git diff --check` đạt. Lần build đầu thiếu kết nối Google Fonts cho Geist, lần chạy lại có mạng đã đạt. Chưa có Android project để biên dịch snippet; bước tiếp theo: WorkManager/notification và test data layer.
- 2026-09-19: Tiếp tục giai đoạn 3 với `offline-first-data`: Room, DAO `Flow`, local source of truth, repository refresh, mapping, transaction và queued write. Tổng cộng 63 concept/lesson và 189 stage; EN/VI parity, 54 test, lint, typecheck, build 609 trang tĩnh và `git diff --check` đạt. Chưa có Android project để biên dịch snippet; bước tiếp theo: Paging nâng cao/offline pagination và test data layer.
- 2026-09-19: Tiếp tục giai đoạn 3 với `repository-boundary` và `dependency-injection`, gồm mapping ở data boundary, fake repository, constructor injection, manual DI và Hilt. Tổng cộng 62 concept/lesson và 186 stage; EN/VI parity, 54 test, lint, typecheck, build 600 trang tĩnh và `git diff --check` đạt. Chưa có Android project để biên dịch snippet; bước tiếp theo: Room/Paging/offline và test data layer.
- 2026-09-19: Tiếp tục giai đoạn 3 với `coroutine-scopes` và `flow-and-stateflow`, gồm structured cancellation, ViewModel ownership, Flow cold, StateFlow hot và upstream sharing. Tổng cộng 60 concept/lesson và 180 stage; EN/VI parity, 53 test, lint, typecheck, build 582 trang tĩnh và `git diff --check` đạt. Chưa có Android project để biên dịch snippet; bước kế tiếp là ViewModel/repository/DI và test bất đồng bộ.
- 2026-09-19: Tiếp tục giai đoạn 3 với `android-build-variants`, `android-intents` và `android-activity-lifecycle`, gồm build debug/demo/release, source set, merged manifest, signing, React Native JavaScript bundle, ACTION_VIEW/ACTION_SEND, cold/warm deep link, AppState, LifecycleResumeEffect và collectAsStateWithLifecycle. Tổng cộng 58 concept/lesson, 174 stage; EN/VI parity, 52 test, lint, typecheck, build 564 trang tĩnh và `git diff --check` đạt. Chưa có Android project để biên dịch hoặc chạy snippet; bước kế tiếp là Coroutines/Flow.
- 2026-09-19: Bắt đầu giai đoạn 3 bằng cặp bài về điểm vào Android và resources/bản địa hóa; hai bài được nối vào roadmap và tuyến Junior. Tổng cộng 55 concept/lesson và 165 stage; kiểm tra EN/VI, lint, typecheck, 52 test, build 537 trang tĩnh và `git diff --check` đạt. Chưa compile snippet Android. Tiếp theo: Android Studio/Gradle/build variant/merged manifest và Intent/lifecycle trước khi sang Coroutines/Flow.

- 2026-09-19: Hoàn thành giai đoạn 1 ở phạm vi rà soát tĩnh. Inventory 53 concept/lesson, 159 stage và 6 recipe; sửa các vấn đề P0/P1 ở bảng trên; bổ sung kiểm tra cấu trúc và code EN/VI toàn bộ concept/recipe. `bun.exe run lint`, `bun.exe run typecheck`, `bun.exe test` (49 test), `bun.exe run build` (519 trang tĩnh) và `git diff --check` đạt. Chưa compile code Android vì chưa có sample project; đã ghi thành rủi ro cho giai đoạn 4. Giai đoạn kế tiếp: assessment đầu vào và tuyến junior/middle/senior.
- 2026-09-19: Hoàn thành giai đoạn 2. Thêm bốn câu tự đánh giá, gợi ý tuyến Android Junior/Middle/Senior, bài học theo thứ tự, bài thực hành đầu ra và rubric, prerequisite và skip check cho cả 10 module; nội dung EN/VI tương đương. Hai trang Learn trả HTTP 200 và chứa nội dung bản địa hóa. Lint, typecheck, 51 test, build 519 trang tĩnh, Prettier và `git diff --check` đạt. Chưa kiểm tra thao tác bằng trình duyệt vì phiên hiện tại không có browser kết nối; logic chọn tuyến đã được unit test. Giai đoạn kế tiếp: kiến thức Android nền tảng còn thiếu.
