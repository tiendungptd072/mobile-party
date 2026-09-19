# Kế hoạch chuyển từ React Native sang Android

Tài liệu này theo dõi chương trình học React Native → Kotlin/Jetpack Compose. Đây là kế hoạch phát triển nội dung sau MVP; [roadmap giao sản phẩm](roadmap.md) ghi lại các phase xây website đã hoàn tất. Mỗi phiên làm việc cập nhật trạng thái, bằng chứng kiểm tra và việc còn lại tại đây.

## Đích đến và cách đo

- Junior: hoàn thành một tính năng nhỏ trên Android với hướng dẫn, giải thích được state và lifecycle.
- Middle: tự xây dựng tính năng xuyên suốt UI → ViewModel → repository → dữ liệu, xử lý lỗi và viết test.
- Senior: giải thích quyết định kiến trúc, điều tra lỗi nền tảng, đo hiệu năng và kiểm tra phát hành.
- Tốc độ chuyển đổi chỉ được đánh giá sau khi developer React Native thử làm bài thực hành. Số lesson và số test website không phải thước đo năng lực Android.

## Trạng thái giai đoạn

| Giai đoạn                      | Việc cần bàn giao                                                             | Trạng thái              |
| ------------------------------ | ----------------------------------------------------------------------------- | ----------------------- |
| 1. Kiểm tra nội dung           | Inventory, rà soát rủi ro, sửa ví dụ sai, EN/VI parity, issue register        | Hoàn thành rà soát tĩnh |
| 2. Lộ trình theo trình độ      | Assessment đầu vào, prerequisite, tuyến junior/middle/senior và rubric        | Hoàn thành              |
| 3. Kiến thức Android thiết yếu | Platform, Coroutines/Flow, architecture/DI, data/offline, background, testing | Hoàn thành nội dung web |
| 4. Dự án thực hành             | Starter, checkpoint, lời giải, build và test Android thật                     | Đang thực hiện          |
| 5. Nhánh senior                | Bài toán architecture, migration, performance và release có rubric            | Chưa bắt đầu            |
| 6. Kiểm chứng hiệu quả         | Kiểm tra hai nền tảng và thử nghiệm với người học React Native                | Chưa bắt đầu            |

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

Giai đoạn 3 đã hoàn thành ở phạm vi nội dung web. Bài thực hành có Android project chạy được để kiểm tra Gradle/merged manifest, Intent, lifecycle, worker và notification trên thiết bị thuộc giai đoạn 4. Chưa biên dịch các snippet Android bằng Gradle vì sample project thuộc giai đoạn 4.

Điều kiện kết thúc: các bài mới giúp triển khai những checkpoint tương ứng của dự án mẫu, với EN/VI và test nội dung đạt.

## Giai đoạn 4: Dự án thực hành

Một ứng dụng danh sách/chi tiết có tìm kiếm, phân trang, bookmark offline và đồng bộ. Tạo starter và checkpoint theo thứ tự: UI giả lập → state/navigation → network → Room → Paging/background → test/release. Mỗi checkpoint có hướng dẫn chạy, lời giải, bài tập và tiêu chí nghiệm thu. Dự kiến đặt sample trong `examples/android/` để liên kết theo commit/file; Gradle chỉ phục vụ sample Android, website tiếp tục dùng Bun.

Tiến độ checkpoint 1 (2026-09-19): tạo `examples/android/` với Gradle Wrapper 8.13, Android SDK Platform 35, Compose, `AppViewModel`, Navigation Compose, feed/detail giả lập, bookmark action, UI test và unit test. `testDebugUnitTest` đã build và chạy thành công bằng JDK 21. Không có emulator hoặc thiết bị kết nối nên `connectedDebugAndroidTest` chưa chạy; test UI đã có trong source và sẽ chạy ở checkpoint test/release. Checkpoint tiếp theo: tách repository, thêm fake data source và kiểm thử state transition.

Điều kiện kết thúc: mỗi checkpoint build và test bằng Android toolchain trong CI. Việc chạy trên emulator/thiết bị được xác nhận khi môi trường hỗ trợ.

## Giai đoạn 5: Nhánh senior

Bài tập về ranh giới module, dependency scope, race condition, process recreation, migration View/XML ↔ Compose, profiling, signing và release. Rubric đánh giá quyết định và bằng chứng, không ép một đáp án kiến trúc duy nhất.

Điều kiện kết thúc: có thể review một lời giải và chỉ rõ correctness, khả năng kiểm thử, trade-off và dữ liệu đo lường.

## Giai đoạn 6: Kiểm chứng hiệu quả

Website chạy lint, typecheck, test, build và kiểm tra EN/VI. Sample Android chạy compile, unit/UI test và kiểm tra trên emulator khi có môi trường. Cho developer React Native ở các mức khác nhau thử một tính năng, ghi lại thời gian hoàn thành, lỗi, số lần cần trợ giúp và khả năng tự giải thích. Sửa thứ tự và độ sâu bài học theo kết quả.

Điều kiện kết thúc: có bằng chứng thực nghiệm để đánh giá lời hứa "chuyển đổi nhanh" và mức năng lực thực tế.

## Nhật ký

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
