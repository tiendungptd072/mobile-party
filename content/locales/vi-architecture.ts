export const viArchitectureConceptTranslations = {
  "offline-pagination": {
    title: "Phân trang offline",
    description:
      "Phân trang UI từ local database và để một coordinator lấy, lưu remote page khi cached data đã hết.",
    implementations: {
      "react-native": {
        name: "Lưu cursor page",
        summary:
          "Repository giữ list row và next cursor cùng nhau trong local cache.",
      },
      kotlin: {
        name: "Phân trang Room bằng RemoteMediator",
        summary:
          "PagingSource đọc Room; RemoteMediator lấy remote page và ghi trở lại.",
      },
    },
    relationship:
      "Cả hai điều phối cursor, local row, append error và refresh. RemoteMediator chuẩn hóa Android pattern: UI chỉ page từ Room, còn dữ liệu network đi vào qua cache update theo transaction.",
    mentalModel:
      "RemoteMediator không phải network list component. Nó là coordinator giữa Paging demand và database-backed source of truth; UI không render response của nó trực tiếp.",
    differences: [
      "FlatList có end-reached signal và app React Native tự chọn cache protocol; Paging cung cấp load type và load-state API.",
      "Với cursor API có key không phải item ID, hãy lưu remote key với cached row để app khởi động lại vẫn request đúng trang tiếp theo.",
    ],
    commonMistakes: [
      "Render network response của RemoteMediator trực tiếp hoặc giữ in-memory list cạnh tranh với Room PagingSource.",
      "Xóa cached row và remote key ngoài một transaction hoặc retry append bằng cursor cũ.",
    ],
    productionNotes: [
      "Model riêng refresh, append, prepend và error; giữ cached row có thể đọc khi remote append thất bại.",
      "Chọn cache freshness trong initialize(); refresh bắt buộc phải hoàn tất trước khi append/prepend dựa vào key của nó.",
    ],
  },
  "offline-first-data": {
    title: "Dữ liệu offline-first",
    description:
      "Expose dữ liệu cục bộ làm source of truth, rồi đồng bộ thay đổi từ network qua repository mà không bắt màn hình chờ có kết nối.",
    implementations: {
      "react-native": {
        name: "Quan sát local cache",
        summary:
          "Screen subscribe dữ liệu domain đã cache; refresh cập nhật cache đó.",
      },
      kotlin: {
        name: "Quan sát Room qua repository",
        summary:
          "ViewModel collect local row trong khi repository refresh chúng từ network.",
      },
    },
    relationship:
      "Cả hai có thể render local cache có thể quan sát ngay và đồng bộ nền. Room là SQLite abstraction cho dữ liệu có cấu trúc của Android; AsyncStorage không thay thế được relational query hay migration.",
    mentalModel:
      "Offline-first không phải là 'chỉ fallback sang cache cũ sau khi fetch thất bại'. Layer phía trên đọc một local source of truth; riêng repository điều phối network response và write với source đó.",
    differences: [
      "React Native thường cung cấp cache qua application library hoặc custom store; Android thường biểu diễn structured local data bằng Room entity và DAO Flow.",
      "Room DAO có thể validate SQL lúc compile và hỗ trợ schema migration; entity type của nó vẫn là chi tiết data layer, không phải UI model.",
    ],
    commonMistakes: [
      "Để ViewModel hoặc composable race network response trực tiếp với Room, tạo hai source of truth.",
      "Coi mọi write đều queue được an toàn; cần chọn rõ online-only, queued hay lazy write theo yêu cầu correctness của thao tác.",
    ],
    productionNotes: [
      "Đọc local store, map network/entity model tại boundary, rồi update store theo transaction trước khi observer render dữ liệu đã refresh.",
      "Cho người dùng biết freshness và retry intent khi cần; chỉ dùng durable queued work khi business operation replay được an toàn.",
    ],
  },
  "repository-boundary": {
    title: "Ranh giới repository",
    description:
      "Đặt network, database và platform source sau repository để screen state có thể test và không phụ thuộc transport.",
    implementations: {
      "react-native": {
        name: "Inject repository vào screen hook",
        summary: "Hook nhận repository hướng domain, không nhận fetch client.",
      },
      kotlin: {
        name: "Inject repository vào ViewModel",
        summary:
          "ViewModel phụ thuộc dữ liệu domain, không phụ thuộc Retrofit, Room hay Context.",
      },
    },
    relationship:
      "Cả hai giữ state owner của UI phụ thuộc vào contract hướng ứng dụng. Trên Android, repository là ranh giới được khuyến nghị cho data source như network, Room, DataStore và platform provider.",
    mentalModel:
      "Repository sở hữu cách lấy và đồng bộ dữ liệu ứng dụng; ViewModel sở hữu cách dữ liệu đó trở thành screen state. Đừng máy móc ánh xạ mỗi API endpoint thành repository method—hãy thiết kế contract quanh dữ liệu ứng dụng và thao tác người dùng.",
    differences: [
      "Team React Native có thể đặt query client hoặc API module ngay sau hook; kiến trúc Android khuyến nghị repository nằm giữa UI layer và data source.",
      "Repository có thể expose suspend function cho thao tác một lần và Flow cho thay đổi theo thời gian; nó không phải UI state store.",
    ],
    commonMistakes: [
      "Inject Retrofit, DAO, AsyncStorage hoặc Android Context trực tiếp vào ViewModel hay reusable composable.",
      "Tạo repository chỉ chuyển tiếp mọi lời gọi mà không có quyết định về ownership dữ liệu, mapping, cache hoặc khả năng test.",
    ],
    productionNotes: [
      "Map transport và persistence model tại data-layer boundary, rồi expose domain model hoặc error ổn định ra phía trên.",
      "Dùng fake repository trong ViewModel test; để integration test network/database thật cho repository implementation.",
    ],
  },
  "dependency-injection": {
    title: "Dependency injection và lifetime",
    description:
      "Cung cấp dependency từ composition root rõ ràng, rồi chỉ scope object mutable hoặc tốn chi phí khởi tạo theo lifetime thực sự cần.",
    implementations: {
      "react-native": {
        name: "Ghép dependency ở app root",
        summary:
          "Root tạo service production và truyền contract hẹp vào route hoặc provider.",
      },
      kotlin: {
        name: "Constructor-inject dependency của ViewModel",
        summary: "Hilt tạo ViewModel và cấp repository từ dependency graph.",
      },
    },
    relationship:
      "Cả hai đều ghép object graph bên ngoài reusable UI. React thường dùng module export, root props hoặc Context; Android có thể dùng constructor wiring thủ công cho app nhỏ hoặc Hilt cho graph lớn và Android component integration.",
    mentalModel:
      "Dependency đi vào qua constructor; event và data đi ra qua contract. Chỉ scope object khi nó sở hữu mutable shared state hoặc khởi tạo tốn kém. DI framework tổ chức việc tạo object—nó không thay thế architecture boundary.",
    differences: [
      "React Context phân phối value theo UI subtree; nó không tự là dependency container nhận biết lifecycle.",
      "Hilt tích hợp với Android component lifetime và cung cấp Hilt-supported ViewModel, còn manual DI vẫn phù hợp với graph nhỏ, dễ hiểu.",
    ],
    commonMistakes: [
      "Dùng service locator trong ViewModel hoặc composable, che dependency bắt buộc và làm test khó kiểm soát.",
      "Thêm Hilt chỉ để tránh viết hai constructor hoặc scope mọi dependency thành singleton.",
    ],
    productionNotes: [
      "Ưu tiên constructor injection và interface tại ranh giới cần thay thế trong test. Giữ dependency UI hẹp và truyền plain state/callback vào reusable composable.",
      "Dùng Hilt khi graph cần Android integration, nhiều ViewModel, WorkManager hoặc navigation-scoped ViewModel; nếu không thì giữ manual wiring rõ ràng.",
    ],
  },
} as const;

export const viArchitectureRoadmapTranslations = {
  "offline-pagination": {
    title: "Phân trang offline",
    exercise:
      "Giữ feed row và cursor trong local storage, rồi giải thích Room Paging và RemoteMediator làm boundary đó rõ ràng thế nào.",
    checklist: [
      "UI chỉ page từ local source",
      "Row và remote key cập nhật trong một transaction",
      "Refresh và append error tách biệt",
    ],
    stages: [
      "Phân trang database-backed list thay vì network response trực tiếp.",
      "Dùng RemoteMediator lưu remote page tiếp theo trước khi Room phục vụ nó.",
      "Lưu remote key cùng row và tách riêng recovery refresh/append.",
    ],
  },
  "offline-first-data": {
    title: "Dữ liệu offline-first",
    exercise:
      "Làm feed render dữ liệu cục bộ trước, refresh Room cache qua repository và nêu rõ write nào an toàn để queue.",
    checklist: [
      "Layer phía trên đọc một local source of truth",
      "Repository map network và database model",
      "Queued write được xác nhận an toàn để replay",
    ],
    stages: [
      "Định nghĩa local data có thể quan sát cho feed.",
      "Refresh Room qua repository thay vì trả network DTO cho screen.",
      "Cập nhật cache theo transaction và chỉ queue mutation replay được.",
    ],
  },
  "repository-boundary": {
    title: "Ranh giới repository",
    exercise:
      "Tách profile screen khỏi HTTP client, map DTO một lần và test state owner với fake repository không cần network.",
    checklist: [
      "ViewModel/UI không gọi data source trực tiếp",
      "Map transport/persistence model tại boundary",
      "Test state owner với fake repository",
    ],
    stages: [
      "Định nghĩa contract repository hẹp cho dữ liệu màn hình.",
      "Map DTO thành domain model trong repository implementation.",
      "Dùng fake repository có kết quả kiểm soát được trong test state owner.",
    ],
  },
  "dependency-injection": {
    title: "Dependency injection và lifetime",
    exercise:
      "Ghép repository tại app root, thay bằng fake trong test, rồi quyết định dependency nào thật sự cần shared lifetime hay Hilt.",
    checklist: [
      "Dependency đi vào qua constructor hoặc root prop",
      "Không dùng service locator trong UI",
      "Chọn manual DI hoặc Hilt theo độ phức tạp graph",
    ],
    stages: [
      "Wire repository ở route hoặc constructor của ViewModel.",
      "Thay dependency bằng fake trong test hoặc bind implementation trong Hilt.",
      "Scope object shared có chủ đích và inject Hilt ViewModel ở route boundary.",
    ],
  },
} as const;
