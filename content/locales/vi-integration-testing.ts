export const viIntegrationTestingConceptTranslations = {
  "navigation-testing": {
    title: "Kiểm thử điều hướng",
    description:
      "Kiểm thử màn hình đích và tham số mà người dùng thực sự thấy từ navigation graph, thay vì kiểm tra chi tiết điều hướng nội bộ.",
    implementations: {
      "react-native": {
        name: "Kiểm thử màn hình đích của React Navigation",
        summary:
          "Render navigation tree của ứng dụng, thực hiện thao tác người dùng rồi kiểm tra nội dung của màn hình đích.",
      },
      kotlin: {
        name: "Kiểm thử màn hình đích trong Compose",
        summary:
          "Render NavHost thật, kích hoạt semantic action rồi kiểm tra UI ở màn hình đích.",
      },
    },
    relationship:
      "Cả hai đều bắt đầu từ thao tác người dùng và chứng minh màn hình mà người dùng thấy. React Navigation thường cần chạy hết timer cho animation; Compose truy vấn semantics tree của màn hình đích.",
    mentalModel:
      "Navigation là contract quan sát được: từ màn hình bắt đầu và thao tác người dùng, màn hình đích đúng phải render với tham số an toàn. Ưu tiên contract này hơn là kiểm tra thao tác stack nội bộ của navigator.",
    differences: [
      "Thiết lập test React Navigation render navigation container hoặc static navigation tree và có thể cần fake timer; Compose UI test render NavHost và thao tác qua semantic node.",
      "Route Compose nên mang ID ổn định, sau đó màn hình đích tải dữ liệu hiện tại đã được cấp quyền. Không truyền cả object qua route làm nguồn dữ liệu chính.",
    ],
    commonMistakes: [
      "Chỉ kiểm tra lời gọi NavController.navigate, vốn chỉ chứng minh chi tiết wiring chứ không chứng minh màn hình đích render được tham số.",
      "Chỉ dùng text nhìn thấy để chọn icon action thay vì đặt content description hoặc test tag ổn định.",
    ],
    productionNotes: [
      "Mỗi luồng quan trọng cần có đường test nhỏ nhất: màn hình bắt đầu, thao tác, nội dung màn hình đích và một trường hợp tham số thiếu hoặc không hợp lệ.",
      "Đặt việc parse deep link và quyết định quyền truy cập ngoài UI của màn hình đích dùng lại, rồi test cold start và restored task ở app boundary.",
    ],
  },
  "background-work-testing": {
    title: "Kiểm thử công việc nền",
    description:
      "Kiểm thử chính sách retry và lỗi vĩnh viễn của worker mà không chờ thời gian thật, sau đó chỉ dùng test driver của WorkManager cho hành vi lên lịch quan trọng.",
    implementations: {
      "react-native": {
        name: "Kiểm thử contract lên lịch đồng bộ",
        summary:
          "Dùng fake scheduler để kiểm tra unique work và retry policy mà không chạy Headless JS.",
      },
      kotlin: {
        name: "Kiểm thử kết quả CoroutineWorker",
        summary:
          "Tạo worker với input được kiểm soát và kiểm tra trực tiếp retry so với lỗi vĩnh viễn.",
      },
    },
    relationship:
      "React Native thường cô lập contract lên lịch sau fake vì durable scheduler là native. Android có test utility của WorkManager để test trực tiếp worker và điều khiển constraint trong integration test.",
    mentalModel:
      "Tách work policy khỏi scheduler của hệ điều hành. Unit test ý nghĩa của success, retry và lỗi vĩnh viễn; dùng một integration test để chứng minh WorkRequest có constraint trở nên đủ điều kiện khi test driver mở khóa.",
    differences: [
      "Headless JS là điểm vào Android bridge, không thay thế cho constraint và retry semantics được lưu bền của WorkManager.",
      "TestListenableWorkerBuilder kiểm tra logic worker mà không khởi tạo WorkManager; WorkManagerTestInitHelper và TestDriver dành cho tập nhỏ integration test về scheduling.",
    ],
    commonMistakes: [
      "Sleep trong test để chờ backoff hoặc điều kiện mạng thay vì điều khiển scheduler qua API test của WorkManager.",
      "Trả success sau lỗi tạm thời, hoặc retry lỗi validation mãi mãi làm thành vòng lặp không quan sát được.",
    ],
    productionNotes: [
      "Giữ worker input nhỏ và lưu bền, làm repository operation bên dưới có tính idempotent, rồi ánh xạ lỗi có chủ đích sang Result.success(), Result.retry() hoặc Result.failure().",
      "Dùng WorkManagerTestInitHelper cùng TestDriver để test constraint và initial delay; không lặp lại mọi unit test thành scheduler integration test chậm.",
    ],
  },
} as const;

export const viIntegrationTestingRoadmapTranslations = {
  "navigation-testing": {
    title: "Kiểm thử điều hướng",
    exercise:
      "Test thao tác mở profile, ID đến đúng màn hình đích và trạng thái có thể khôi phục khi profile không còn tồn tại.",
    checklist: [
      "Test bắt đầu từ thao tác người dùng và kiểm tra UI của màn hình đích",
      "Route chỉ truyền ID ổn định, không truyền cả object",
      "Một đường tham số thiếu hoặc không hợp lệ hiển thị trạng thái có thể phục hồi",
    ],
    stages: [
      "Mở màn hình đích từ một semantic action.",
      "Kiểm tra ID route đến đúng màn hình mà không phụ thuộc animation.",
      "Kiểm tra trạng thái deep link hoặc restored route không hợp lệ.",
    ],
  },
  "background-work-testing": {
    title: "Kiểm thử công việc nền",
    exercise:
      "Test sync worker phân biệt retry và lỗi vĩnh viễn, sau đó dùng TestDriver để giải phóng constraint mạng mà không chờ thời gian thật.",
    checklist: [
      "Unit test worker không cần WorkManager thật",
      "Lỗi tạm thời và lỗi vĩnh viễn trả về Result khác nhau",
      "Integration test chỉ điều khiển constraint hoặc delay cần thiết",
    ],
    stages: [
      "Kiểm tra unique work và kết quả worker bằng nguồn fake.",
      "Phân loại retryable failure và permanent failure.",
      "Dùng WorkManager TestDriver để điều khiển constraint không cần chờ thật.",
    ],
  },
} as const;
