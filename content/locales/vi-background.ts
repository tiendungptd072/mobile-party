export const viBackgroundConceptTranslations = {
  "durable-background-work": {
    title: "Công việc nền bền vững",
    description:
      "Lên lịch đồng bộ có thể trì hoãn ngoài vòng đời màn hình, với điều kiện mạng, unique work và quy tắc retry rõ ràng.",
    implementations: {
      "react-native": {
        name: "Headless JS với bộ lập lịch native",
        summary:
          "Bộ lập lịch Android native có thể khởi chạy tác vụ JavaScript đã đăng ký sau khi UI đóng.",
      },
      kotlin: {
        name: "CoroutineWorker",
        summary:
          "WorkManager sở hữu request và chạy worker suspend khi thỏa điều kiện.",
      },
    },
    relationship:
      "Headless JS chạy tác vụ JavaScript đã đăng ký khi Android native khởi động service; riêng việc đăng ký không lưu hay lên lịch công việc. WorkManager lưu và lên lịch work request theo điều kiện Android.",
    mentalModel:
      "Coroutine của màn hình hoặc React effect chỉ sở hữu công việc khi owner còn sống. Dùng WorkManager cho thao tác có thể trì hoãn nhưng cần tồn tại sau khi rời màn hình hoặc process kết thúc; worker gọi thao tác repository an toàn để retry.",
    differences: [
      "WorkManager lên lịch công việc một lần hoặc định kỳ và có thể trì hoãn theo điều kiện mạng, pin và hệ thống; nó không phải đồng hồ hẹn giờ chính xác.",
      "React Native cần bộ lập lịch Android native hoặc thư viện xây trên nó cho durable job. Headless JS mô tả cách chạy JavaScript, không quyết định chính sách lên lịch.",
    ],
    commonMistakes: [
      "Bắt đầu đồng bộ trong screen effect và cho rằng nó sẽ hoàn tất sau khi process bị đóng.",
      "Enqueue công việc trùng mỗi lần mở app hoặc retry mãi lỗi xác thực hay validation.",
    ],
    productionNotes: [
      "Enqueue unique work với chính sách thay thế và điều kiện mạng được chọn rõ; làm thao tác repository idempotent trước khi cho phép retry.",
      "Trả về retry cho lỗi tạm thời và failure cho lỗi vĩnh viễn. Expose WorkInfo hoặc repository state khi người dùng cần thấy trạng thái đồng bộ chờ.",
    ],
  },
  "android-notifications": {
    title: "Thông báo Android",
    description:
      "Gửi thông báo Android qua channel, xin quyền đúng ngữ cảnh và mở đúng nội dung khi người dùng chạm vào thông báo.",
    implementations: {
      "react-native": {
        name: "Bridge thông báo native của ứng dụng",
        summary:
          "UI React Native gọi Android bridge hoặc thư viện của app; nền tảng vẫn sở hữu việc hiển thị.",
      },
      kotlin: {
        name: "NotificationCompat với channel",
        summary:
          "Android đăng thông báo bằng channel đã đăng ký và small icon.",
      },
    },
    relationship:
      "React Native core không có API local notification đa nền tảng; Android bridge hoặc thư viện cuối cùng vẫn dùng channel, permission và notification manager của nền tảng như code Kotlin native.",
    mentalModel:
      "Android sở hữu việc hiển thị thông báo, kể cả khi React Native khởi tạo. Thiết kế channel, permission, content intent và điều hướng khi chạm như hành vi nền tảng ở cả hai cách triển khai.",
    differences: [
      "Android 8.0+ yêu cầu notification channel đã đăng ký; người dùng có thể thay đổi mức độ quan trọng của channel sau khi tạo.",
      "Android 13+ yêu cầu POST_NOTIFICATIONS cho phần lớn thông báo; ứng dụng vẫn phải cho phép dùng chức năng chính khi quyền bị từ chối.",
    ],
    commonMistakes: [
      "Đăng thông báo trước khi tạo channel hoặc cho rằng thư viện thông báo có thể bỏ qua quy tắc permission của Android.",
      "Xin quyền ngay khi mở app mà không giải thích lợi ích, hoặc quên màn hình đích và back stack khi chạm thông báo.",
    ],
    productionNotes: [
      "Tạo channel ổn định khi app khởi động, bản địa hóa tên channel và thông điệp, rồi xin quyền sau thao tác liên quan của người dùng.",
      "Dùng PendingIntent cho màn hình đích; test thao tác chạm thông báo khi app chưa chạy và sau khi từ chối quyền.",
    ],
  },
} as const;

export const viBackgroundRoadmapTranslations = {
  "durable-background-work": {
    title: "Công việc nền bền vững",
    exercise:
      "Đưa đồng bộ bookmark đang chờ vào unique work có điều kiện mạng; chứng minh retry không gửi thao tác trùng.",
    checklist: [
      "Worker không phụ thuộc vòng đời màn hình",
      "Unique work tránh lịch trùng",
      "Retry chỉ dành cho lỗi tạm thời và thao tác idempotent",
    ],
    stages: [
      "Đăng ký tác vụ nền và xác định owner thực thi.",
      "Lên lịch unique work với điều kiện mạng.",
      "Phân loại lỗi retry và giữ thao tác an toàn khi chạy lại.",
    ],
  },
  "android-notifications": {
    title: "Thông báo Android",
    exercise:
      "Cho phép bật nhắc nhở sau thao tác của người dùng, đăng thông báo qua channel và mở đúng bài viết khi chạm.",
    checklist: [
      "Tạo channel trước khi đăng thông báo",
      "Xin POST_NOTIFICATIONS đúng ngữ cảnh trên Android 13+",
      "Tap intent mở đúng nội dung từ cold start",
    ],
    stages: [
      "Tạo notification channel và contract ở UI.",
      "Xin quyền sau khi người dùng bật nhắc nhở và xử lý từ chối.",
      "Gắn PendingIntent và kiểm tra điều hướng khi chạm.",
    ],
  },
} as const;
