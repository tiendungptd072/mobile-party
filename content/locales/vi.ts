import {
  viKotlinBridgeConceptTranslations,
  viKotlinBridgeRoadmapTranslations,
} from "@content/locales/vi-kotlin-bridge";
import {
  viComposeRuntimeConceptTranslations,
  viComposeRuntimeRoadmapTranslations,
} from "@content/locales/vi-compose-runtime";
import {
  viLayoutMechanicsConceptTranslations,
  viLayoutMechanicsRoadmapTranslations,
} from "@content/locales/vi-layout-mechanics";
import {
  viAndroidPlatformConceptTranslations,
  viAndroidPlatformRoadmapTranslations,
} from "@content/locales/vi-android-platform";
import {
  viCoroutinesConceptTranslations,
  viCoroutinesRoadmapTranslations,
} from "@content/locales/vi-coroutines";
import {
  viArchitectureConceptTranslations,
  viArchitectureRoadmapTranslations,
} from "@content/locales/vi-architecture";
import {
  viBackgroundConceptTranslations,
  viBackgroundRoadmapTranslations,
} from "@content/locales/vi-background";
import {
  viFlowTestingConceptTranslations,
  viFlowTestingRoadmapTranslations,
} from "@content/locales/vi-flow-testing";
import {
  viIntegrationTestingConceptTranslations,
  viIntegrationTestingRoadmapTranslations,
} from "@content/locales/vi-integration-testing";

export const viConceptTranslations = {
  ...viKotlinBridgeConceptTranslations,
  ...viComposeRuntimeConceptTranslations,
  ...viLayoutMechanicsConceptTranslations,
  ...viAndroidPlatformConceptTranslations,
  ...viCoroutinesConceptTranslations,
  ...viArchitectureConceptTranslations,
  ...viBackgroundConceptTranslations,
  ...viFlowTestingConceptTranslations,
  ...viIntegrationTestingConceptTranslations,
  component: {
    title: "Component",
    description:
      "So sánh đơn vị UI có thể tái sử dụng trong React Native và Jetpack Compose.",
    implementations: {
      "react-native": {
        name: "Function component",
        summary: "Một hàm trả về React element dựa trên props và state.",
      },
      kotlin: {
        name: "Composable function",
        summary: "Một hàm có annotation @Composable dùng để mô tả UI.",
      },
    },
    relationship:
      "Cả hai đều ghép UI từ các hàm, nhưng quá trình render của React và recomposition của Compose chạy trên những runtime khác nhau.",
    mentalModel:
      "Hãy chuyển một React function component thành composable function, sau đó học lại cách identity, recomposition và vòng đời state hoạt động trong Compose.",
    differences: [
      "Compose đánh dấu hàm UI bằng @Composable.",
      "Hai framework có quy tắc khác nhau để bỏ qua và lên lịch công việc UI.",
    ],
    commonMistakes: [
      "Xem mỗi lần gọi composable như một component instance tồn tại lâu dài.",
    ],
    productionNotes: [
      "Giữ composable tập trung vào một trách nhiệm và hoist state khi caller cần sở hữu hoặc tái sử dụng.",
    ],
  },
  props: {
    title: "Props và tham số",
    description:
      "Truyền dữ liệu bất biến và event callback vào React component và composable function.",
    implementations: {
      "react-native": {
        name: "Component props",
        summary:
          "Props object có type truyền giá trị và callback vào component.",
      },
      kotlin: {
        name: "Tham số composable",
        summary: "Tham số hàm đưa state đi xuống và event lambda đi lên.",
      },
    },
    relationship:
      "Props và tham số composable cùng đóng vai trò ranh giới: giá trị bất biến đi vào, còn user event đi ra qua callback.",
    mentalModel:
      "Hãy xem composable là một hàm có UI contract rõ ràng. Chỉ truyền state mà nó render và callback cho event mà nó phát ra.",
    differences: [
      "React gom input trong props object; Kotlin dùng named function parameter.",
      "Lambda của Compose thường trả về Unit và có thể mang event data có type.",
    ],
    commonMistakes: [
      "Truyền ViewModel xuyên qua mọi child thay vì chỉ đưa value và event cần thiết cho composable tái sử dụng.",
    ],
    productionNotes: [
      "Ưu tiên tham số bất biến và event contract ổn định; giữ dependency cấp màn hình ở ranh giới screen.",
    ],
  },
  children: {
    title: "Children và content slot",
    description:
      "Ghép container tái sử dụng bằng React children và content lambda của Compose.",
    implementations: {
      "react-native": {
        name: "ReactNode children",
        summary:
          "Prop children cho phép caller cung cấp React element lồng nhau.",
      },
      kotlin: {
        name: "Composable content lambda",
        summary:
          "Lambda @Composable cho phép caller điền nội dung vào một slot có tên.",
      },
    },
    relationship:
      "Cả hai đều hỗ trợ UI lồng nhau do caller cung cấp, còn Compose mô hình hóa slot rõ ràng bằng tham số composable function.",
    mentalModel:
      "Chuyển children thành content lambda. Khi container có nhiều vị trí chèn, hãy đặt tên có ý nghĩa cho từng lambda slot.",
    differences: [
      "React có prop children theo quy ước.",
      "Compose có thể cung cấp nhiều slot có type, receiver scope và tham số.",
    ],
    commonMistakes: [
      "Tạo container lớn điều khiển bằng nhiều boolean thay vì cung cấp các slot tập trung để caller tự compose.",
    ],
    productionNotes: [
      "Dùng slot API cho bố cục linh hoạt và để container chịu trách nhiệm về cấu trúc, không sở hữu content state của caller.",
    ],
  },
  "conditional-ui": {
    title: "UI có điều kiện",
    description:
      "Hiển thị một nhánh UI từ state rõ ràng trong React Native và Jetpack Compose.",
    implementations: {
      "react-native": {
        name: "Conditional rendering trong JavaScript",
        summary:
          "Chọn JSX bằng biểu thức điều kiện trong lúc component render.",
      },
      kotlin: {
        name: "Biểu thức if trong Kotlin",
        summary: "Chọn composable được phát ra trong composition hiện tại.",
      },
    },
    relationship:
      "Cả hai đều mô tả UI như một nhánh của state hiện tại; Compose phát ra một cây con khác thay vì thay đổi trực tiếp view đang có.",
    mentalModel:
      "Hãy coi mỗi nhánh là mô tả của một trạng thái. Đừng bật hoặc ẩn native view theo kiểu imperative khi state thay đổi.",
    differences: [
      "React Native dùng biểu thức JavaScript trong JSX.",
      "Compose dùng control flow của Kotlin khi tạo UI.",
    ],
    commonMistakes: [
      "Không mô hình hóa rõ loading, empty và error khiến nội dung cũ vẫn còn hiển thị.",
    ],
    productionNotes: [
      "Biểu diễn các trạng thái màn hình loại trừ nhau bằng sealed UI-state model.",
    ],
  },
  "local-state": {
    title: "State cục bộ",
    description:
      "So sánh state do view sở hữu với useState của React Native và các API state của Compose.",
    implementations: {
      "react-native": {
        name: "useState",
        summary: "Lưu state cho một component instance đang được mount.",
      },
      kotlin: {
        name: "remember + mutableStateOf",
        summary: "Giữ observable state qua các lần recomposition.",
      },
    },
    relationship:
      "Cả hai đều giữ state UI cục bộ và kích hoạt cập nhật, nhưng remember gắn với identity trong composition chứ không chỉ với vị trí hook của React.",
    mentalModel:
      "Hãy xem remember kết hợp mutableStateOf là state cục bộ của composition, không phải bản thay thế máy móc cho mọi lời gọi useState.",
    differences: [
      "React cập nhật state qua setter; Compose có thể dùng cú pháp delegated property.",
      "remember không sống sót sau khi Activity được tạo lại nếu không kết hợp saveable state.",
    ],
    commonMistakes: [
      "Dùng remember cho state đáng ra phải thuộc ViewModel hoặc cần sống sót sau recreation.",
    ],
    productionNotes: [
      "Hoist state và cung cấp event khi composable cần dễ tái sử dụng và kiểm thử.",
    ],
  },
  "derived-state": {
    title: "State dẫn xuất",
    description:
      "Tính giá trị UI từ state hiện có mà không tạo thêm một source of truth.",
    implementations: {
      "react-native": {
        name: "Dẫn xuất khi render",
        summary:
          "Tính trực tiếp một giá trị ít tốn kém từ props và state hiện tại.",
      },
      kotlin: {
        name: "Dẫn xuất khi recompose",
        summary:
          "Tính trực tiếp một giá trị ít tốn kém từ tham số composable mới nhất.",
      },
    },
    relationship:
      "Cả hai nên dẫn xuất giá trị ít tốn kém trong lúc render thay vì đồng bộ một mutable state bị trùng lặp.",
    mentalModel:
      "Nếu một giá trị có thể tính từ input hiện tại, hãy tính nó. Chỉ dùng useMemo hoặc derivedStateOf khi chi phí đã đo được hoặc tần suất cập nhật thực sự cần memoization.",
    differences: [
      "Memoization của React phụ thuộc vào dependency array.",
      "derivedStateOf hữu ích nhất khi input state thay đổi thường xuyên hơn mức UI cần cập nhật.",
    ],
    commonMistakes: [
      "Sao chép giá trị dẫn xuất vào mutable state rồi dùng effect để giữ chúng đồng bộ.",
    ],
    productionNotes: [
      "Giữ một source of truth; chỉ tối ưu phép dẫn xuất sau khi xác định chi phí tính toán hoặc recomposition đáng kể.",
    ],
  },
  "global-state": {
    title: "State màn hình và state dùng chung",
    description:
      "So sánh external React store với quyền sở hữu state bằng ViewModel và StateFlow trên Android.",
    implementations: {
      "react-native": {
        name: "External store selector",
        summary: "Component subscribe vào phần state nhỏ nhất mà nó render.",
      },
      kotlin: {
        name: "ViewModel + StateFlow",
        summary:
          "Màn hình collect state bất biến từ state holder nhận biết lifecycle.",
      },
    },
    relationship:
      "Cả hai cung cấp shared observable state, nhưng ViewModel là screen state holder có lifecycle scope, không phải bản thay thế trực tiếp cho JavaScript store toàn process.",
    mentalModel:
      "Bắt đầu bằng việc giao state cho owner thấp nhất cần nó. Dùng ViewModel cho screen state và business logic; đừng chuyển mọi global store thành một Android object toàn cục.",
    differences: [
      "Vòng đời ViewModel do ViewModelStoreOwner như destination hoặc navigation graph kiểm soát.",
      "Việc collect StateFlow trong Android Compose UI nên nhận biết lifecycle.",
    ],
    commonMistakes: [
      "Đưa toàn bộ app state vào một ViewModel hoặc truyền ViewModel sâu vào các composable tái sử dụng.",
    ],
    productionNotes: [
      "Cung cấp UI state bất biến và intent method từ ViewModel, sau đó truyền plain state và callback cho nội dung màn hình.",
    ],
  },
  layout: {
    title: "Bố cục",
    description:
      "Sắp xếp UI bằng flex direction trong React Native và layout composable trong Jetpack Compose.",
    implementations: {
      "react-native": {
        name: "View với Flexbox style",
        summary: "React Native dùng style object để cấu hình bố cục cho View.",
      },
      kotlin: {
        name: "Row với Modifier",
        summary: "Compose dùng layout composable và chuỗi modifier để định vị.",
      },
    },
    relationship:
      "Cả hai dùng mô hình gần với flex, nhưng Compose biểu diễn bố cục qua tham số composable và Modifier thay vì một style object duy nhất.",
    mentalModel:
      "Trong Compose, Row hoặc Column chịu trách nhiệm đo và đặt vị trí, còn Modifier trang trí hoặc ràng buộc từng phần tử con.",
    differences: [
      "Style của React Native là object JavaScript thông thường.",
      "Thứ tự Modifier có ý nghĩa; đổi thứ tự có thể làm thay đổi bố cục và cách vẽ.",
    ],
    commonMistakes: [
      "Cho rằng Modifier tác động lên parent hoặc sibling thay vì composable được gắn Modifier đó.",
    ],
    productionNotes: [
      "Tách spacing và alignment lặp lại thành composable dùng chung hoặc design token.",
    ],
  },
  list: {
    title: "Danh sách",
    description:
      "So sánh danh sách ảo hóa bằng FlatList của React Native và LazyColumn của Compose.",
    implementations: {
      "react-native": {
        name: "FlatList",
        summary: "Ảo hóa các hàng từ một mảng và callback renderItem.",
      },
      kotlin: {
        name: "LazyColumn",
        summary: "Compose các item đang hiển thị thông qua lazy list scope.",
      },
    },
    relationship:
      "Cả hai đều render collection cuộn theo cách lazy, nhưng DSL item và layout engine khác nhau.",
    mentalModel:
      "Ánh xạ cấu hình FlatList sang content DSL của LazyColumn, đồng thời giữ key ổn định và công việc trong mỗi row đủ nhẹ.",
    differences: [
      "LazyColumn xây dựng nội dung qua receiver scope thay vì prop renderItem.",
      "API đo lường và tinh chỉnh khác nhau giữa hai cách triển khai native list.",
    ],
    commonMistakes: [
      "Bỏ qua stable key khi identity của item phải được giữ qua thao tác sắp xếp lại.",
    ],
    productionNotes: [
      "Dùng item model bất biến và stable key; đưa phép biến đổi tốn kém ra ngoài row composition.",
    ],
  },
  "text-input": {
    title: "Nhập văn bản",
    description:
      "Giữ text field được điều khiển bằng state trong React Native và Jetpack Compose.",
    implementations: {
      "react-native": {
        name: "TextInput được điều khiển",
        summary:
          "Giá trị hiển thị và change handler được component state sở hữu.",
      },
      kotlin: {
        name: "TextField được điều khiển",
        summary: "Giá trị đi xuống và change event yêu cầu cập nhật state.",
      },
    },
    relationship:
      "Cả hai input đều được điều khiển bởi value và event callback; bên sở hữu state quyết định giá trị tiếp theo.",
    mentalModel:
      "Một field không tự sở hữu form state chuẩn chỉ vì nó hiển thị giá trị đó. State đi xuống và edit event đi lên.",
    differences: [
      "React Native đặt tên callback là onChangeText.",
      "Compose cung cấp onValueChange và hỗ trợ state hoisting tự nhiên.",
    ],
    commonMistakes: [
      "Truyền value cố định nhưng không cập nhật trong callback khiến input trông như chỉ đọc.",
    ],
    productionNotes: [
      "Đặt validation và submit state bên ngoài các field component có thể tái sử dụng.",
    ],
  },
  form: {
    title: "Form state và validation",
    description:
      "Phối hợp controlled field, validation và trạng thái submit mà không gắn input tái sử dụng với một màn hình.",
    implementations: {
      "react-native": {
        name: "Controlled form state",
        summary: "Màn hình sở hữu giá trị field, validation và submit event.",
      },
      kotlin: {
        name: "Form state được hoist",
        summary:
          "Màn hình dẫn xuất validation từ field state và phát submit intent.",
      },
    },
    relationship:
      "Cả hai giữ giá trị field dưới dạng state, dẫn xuất validation từ các giá trị đó và gửi submit event đến state owner.",
    mentalModel:
      "Form là một state machine nhỏ. Giữ field tái sử dụng tập trung vào value và event; để screen hoặc ViewModel sở hữu validation, submit và server error.",
    differences: [
      "Compose dùng rememberSaveable khi field cần sống qua configuration change.",
      "State hoisting của Compose giúp API field stateless trở nên tự nhiên mà không cần controller riêng.",
    ],
    commonMistakes: [
      "Lưu cờ isValid dẫn xuất tách riêng với field hoặc trộn server error vào generic input component.",
    ],
    productionNotes: [
      "Mô hình hóa rõ submitting, success và failure, đồng thời giúp đường retry hoặc sửa lỗi dễ tiếp cận.",
    ],
  },
  "side-effects": {
    title: "Side effect",
    description:
      "Chạy tác vụ nhận biết lifecycle bằng React useEffect và các effect API của Compose.",
    implementations: {
      "react-native": {
        name: "useEffect",
        summary:
          "Chạy effect sau render và khởi động lại khi dependency thay đổi.",
      },
      kotlin: {
        name: "LaunchedEffect",
        summary:
          "Khởi chạy coroutine có composition scope và chạy lại khi key thay đổi.",
      },
    },
    relationship:
      "Hai API có phần giao nhau cho tác vụ theo lifecycle và key, nhưng Compose tách riêng API cho coroutine, cleanup và việc đưa state ra ngoài Compose.",
    mentalModel:
      "Đừng thay mọi useEffect bằng LaunchedEffect một cách máy móc. Trước tiên hãy xác định công việc có thuộc composition, có cần cleanup hay nên nằm trong ViewModel.",
    differences: [
      "LaunchedEffect sở hữu coroutine và coroutine bị hủy khi rời composition.",
      "DisposableEffect là API riêng cho việc đăng ký cần cleanup.",
    ],
    commonMistakes: [
      "Khởi chạy business work trực tiếp trong composable body hoặc dùng effect key cố định mà không hiểu vòng đời của nó.",
    ],
    productionNotes: [
      "Giữ effect liên quan đến UI; chuyển data loading sống lâu và business orchestration sang state holder nhận biết lifecycle.",
    ],
  },
  lifecycle: {
    title: "Vòng đời và cleanup",
    description:
      "Đăng ký và gỡ external observer an toàn khi UI đi vào hoặc rời vòng đời.",
    implementations: {
      "react-native": {
        name: "Effect cleanup",
        summary:
          "Hàm được trả về sẽ gỡ subscription khi dependency đổi hoặc component unmount.",
      },
      kotlin: {
        name: "DisposableEffect",
        summary: "Đăng ký observer theo key và gỡ observer trong onDispose.",
      },
    },
    relationship:
      "Cả hai gắn cleanup của subscription với vòng đời UI, còn Compose dùng effect key và block onDispose rõ ràng.",
    mentalModel:
      "Chỉ ánh xạ setup và cleanup subscription sang DisposableEffect khi resource thuộc composition. Với observable screen state, nên ưu tiên API collection nhận biết Android lifecycle.",
    differences: [
      "Composable có thể đi vào hoặc rời composition độc lập với lifecycle transition của Activity.",
      "DisposableEffect yêu cầu onDispose là câu lệnh cuối cùng.",
    ],
    commonMistakes: [
      "Cho rằng recomposition tương đương mount hoặc unmount rồi đăng ký observer lặp lại trong composable body.",
    ],
    productionNotes: [
      "Ưu tiên adapter nhận biết lifecycle cho Flow và dùng DisposableEffect cho external listener thực sự cần gỡ thủ công.",
    ],
  },
  async: {
    title: "Tác vụ bất đồng bộ",
    description:
      "So sánh JavaScript Promise với structured concurrency bằng Kotlin coroutine.",
    implementations: {
      "react-native": {
        name: "Promise + async/await",
        summary: "Chờ Promise và xử lý lỗi bằng control flow thông thường.",
      },
      kotlin: {
        name: "Coroutine + suspend",
        summary: "Chạy tác vụ suspend bên trong coroutine scope sở hữu nó.",
      },
    },
    relationship:
      "Cả hai đều biểu diễn công việc bất đồng bộ, nhưng coroutine bổ sung scope có cấu trúc, dispatcher và cơ chế hủy hợp tác.",
    mentalModel:
      "Suspend function giống async function tại call site, nhưng vòng đời của nó thuộc coroutine scope thay vì chỉ thuộc Promise.",
    differences: [
      "Coroutine scope xác định quyền sở hữu và việc hủy tác vụ.",
      "Kotlin dispatcher làm rõ execution context khi cần chuyển context.",
    ],
    commonMistakes: [
      "Khởi chạy coroutine không có scope như một cách thay thế trực tiếp cho việc tạo Promise.",
    ],
    productionNotes: [
      "Khởi chạy công việc từ scope nhận biết lifecycle và giữ suspend function có thể hủy.",
    ],
  },
  "api-request": {
    title: "Gọi API",
    description:
      "So sánh request bằng Axios với Retrofit service và coroutine.",
    implementations: {
      "react-native": {
        name: "Axios",
        summary:
          "HTTP client JavaScript trả về Promise chứa dữ liệu đã decode.",
      },
      kotlin: {
        name: "Retrofit + OkHttp",
        summary: "Service interface có type giao việc truyền tải cho OkHttp.",
      },
    },
    relationship:
      "Cả hai đều bao bọc HTTP call, nhưng Retrofit mô hình hóa endpoint bằng interface còn Axios cung cấp request client tổng quát.",
    mentalModel:
      "Chuyển Axios instance đã cấu hình thành OkHttp client kết hợp Retrofit service interface, rồi giữ orchestration của request trong repository.",
    differences: [
      "Retrofit sinh implementation từ interface có annotation.",
      "Serialization, interceptor và error body cần cấu hình Kotlin rõ ràng.",
    ],
    commonMistakes: [
      "Xem HTTP response không thành công và transport exception là cùng một loại lỗi.",
    ],
    productionNotes: [
      "Giữ service definition gọn và ánh xạ transport model tại ranh giới repository.",
    ],
  },
  navigation: {
    title: "Điều hướng",
    description:
      "Di chuyển giữa các destination bằng React Navigation và Navigation Compose.",
    implementations: {
      "react-native": {
        name: "React Navigation",
        summary: "Một màn hình yêu cầu điều hướng qua navigation object.",
      },
      kotlin: {
        name: "Navigation Compose",
        summary:
          "Callback ở cấp route yêu cầu NavController đi đến destination.",
      },
    },
    relationship:
      "Cả hai điều hướng qua graph và back stack, nhưng Navigation Compose hiện đại có thể mô hình hóa destination bằng serializable route type.",
    mentalModel:
      "Giữ navigation ở ranh giới route. Presentational screen nên nhận navigation callback, không nhận navigation controller, để dễ kiểm thử.",
    differences: [
      "React Navigation thường truyền navigation object cho screen.",
      "Navigation Compose gắn một NavController với một NavHost và graph.",
    ],
    commonMistakes: [
      "Truyền NavController sâu vào composable tái sử dụng hoặc xem navigation như local UI state thông thường.",
    ],
    productionNotes: [
      "Định nghĩa một graph cho mỗi navigation scope và kiểm thử NavHost riêng với destination UI.",
    ],
  },
  "route-parameters": {
    title: "Tham số route",
    description:
      "Truyền identifier nhỏ, có thể tuần tự hóa qua route và tải screen data từ lớp sở hữu.",
    implementations: {
      "react-native": {
        name: "Route params",
        summary:
          "Destination đọc identifier có thể tuần tự hóa từ route.params.",
      },
      kotlin: {
        name: "Typed route argument",
        summary: "NavHost decode route argument trước khi gọi screen content.",
      },
    },
    relationship:
      "Cả hai hệ route nên mang argument nhỏ có thể tuần tự hóa như ID, không mang full mutable domain object.",
    mentalModel:
      "Route parameter xác định thứ cần hiển thị chứ không phải toàn bộ dữ liệu cần hiển thị. Hãy resolve dữ liệu hiện tại trong repository hoặc screen state holder.",
    differences: [
      "React Navigation đọc params từ route object.",
      "Navigation Compose có thể dùng serializable route class và decode từ back stack entry.",
    ],
    commonMistakes: [
      "Truyền toàn bộ user object qua navigation làm dữ liệu cũ bị nhân bản và deep link khó validate hơn.",
    ],
    productionNotes: [
      "Validate argument tại destination boundary và giữ route type ổn định vì external link có thể tồn tại lâu.",
    ],
  },
  "deep-link": {
    title: "Deep link",
    description:
      "Ánh xạ URL nhận vào đến destination đã được xác thực trong React Navigation và Navigation Compose.",
    implementations: {
      "react-native": {
        name: "Linking configuration",
        summary:
          "React Navigation ánh xạ URL pattern đến screen name và params.",
      },
      kotlin: {
        name: "Navigation deep link",
        summary: "Composable destination khai báo URI pattern mà nó chấp nhận.",
      },
    },
    relationship:
      "Cả hai ánh xạ external URL pattern vào navigation state, nhưng platform registration và graph configuration vẫn riêng theo framework.",
    mentalModel:
      "Deep link là input không đáng tin nhưng tình cờ chọn một destination. Hãy parse route, validate argument rồi tải dữ liệu hiện tại đã được cấp quyền.",
    differences: [
      "React Navigation tập trung việc parse URL trong linking configuration.",
      "Navigation Compose có thể khai báo deep link cạnh từng destination trong graph.",
    ],
    commonMistakes: [
      "Điều hướng trực tiếp với path data chưa validate hoặc tự xử lý incoming link ngoài navigation system.",
    ],
    productionNotes: [
      "Giữ URL pattern, Android App Links hoặc iOS Universal Links, authorization check và in-app route đồng bộ.",
    ],
  },
  "loading-state": {
    title: "Trạng thái tải",
    description:
      "Biểu diễn rõ một tác vụ đang chạy thay vì suy ra từ dữ liệu chưa có.",
    implementations: {
      "react-native": {
        name: "ActivityIndicator với UI state",
        summary:
          "Một status riêng điều khiển UI đang tải, còn dữ liệu vẫn là giá trị độc lập.",
      },
      kotlin: {
        name: "CircularProgressIndicator với sealed UI state",
        summary:
          "Biểu thức when đầy đủ nhánh render trạng thái rõ ràng do screen owner cung cấp.",
      },
    },
    relationship:
      "Cả hai render progress indicator từ state; sealed type của Kotlin giúp tập hợp trạng thái render được trở nên rõ ràng và đầy đủ.",
    mentalModel:
      "Loading là một UI state thực sự, không phải sự vắng mặt của content. Hãy tách nó khỏi empty, error và dữ liệu tải thành công.",
    differences: [
      "React thường dùng discriminated union hoặc boolean cùng data; Compose thường mô hình hóa bằng sealed interface.",
      "Compose kiểm tra mọi sealed branch trong biểu thức when khi biên dịch.",
    ],
    commonMistakes: [
      "Dùng list rỗng hoặc data null để biểu thị cả loading lẫn một kết quả thật sự rỗng.",
    ],
    productionNotes: [
      "Xác định refresh có giữ content hiện tại hay không, rồi thể hiện chính sách đó rõ ràng trong immutable screen state.",
    ],
  },
  button: {
    title: "Button",
    description:
      "Ánh xạ press event, disabled state và accessible label giữa React Native và Compose.",
    implementations: {
      "react-native": {
        name: "Pressable",
        summary: "Control có thể nhấn phát event và biểu thị disabled state.",
      },
      kotlin: {
        name: "Button",
        summary:
          "Composable button nhận onClick lambda và enabled state rõ ràng.",
      },
    },
    relationship:
      "Cả hai biểu thị user action bằng callback và render khả năng thực hiện từ state.",
    mentalModel:
      "Button mô tả intent; screen owner quyết định việc xảy ra sau press và action hiện có khả dụng không.",
    differences: [
      "React Native thường dùng Pressable cho custom visual; Compose có Material button và Modifier.clickable.",
      "Standard Compose control tự có semantics; custom clickable UI có thể cần semantics rõ ràng.",
    ],
    commonMistakes: [
      "Khởi chạy async work trong reusable button hoặc để action chạy lại khi request chưa hoàn thành.",
    ],
    productionNotes: [
      "Cung cấp label rõ, touch target đủ lớn và action contract idempotent.",
    ],
  },
  "accessibility-semantics": {
    title: "Accessibility semantics và test tag",
    description:
      "Giữ lại ý nghĩa, trạng thái và khả năng được tìm thấy của custom control, đồng thời tách accessibility semantics khỏi identifier chỉ dành cho test.",
    implementations: {
      "react-native": {
        name: "Custom control có accessibility",
        summary: "Gắn label, role và selected state cho touch target tùy biến.",
      },
      kotlin: {
        name: "Custom control có semantics",
        summary: "Cung cấp role và state tương ứng qua Compose semantics.",
      },
    },
    relationship:
      "Cả hai đều cung cấp mục đích và trạng thái hiện tại của control cho assistive technology, nhưng standard Compose component thường tự có semantics và custom composable có thể bổ sung semantics tree.",
    mentalModel:
      "Ưu tiên standard control vì semantics của chúng đã đúng. Khi cần custom visual, hãy mô tả role, label, state và action người dùng nhìn thấy; chỉ thêm test identifier riêng cho kiểm thử.",
    differences: [
      "React Native dùng accessibility property trên view; Compose cung cấp semantics qua standard composable, Modifier.semantics hoặc Modifier chuyên biệt như toggleable.",
      "testID và Modifier.testTag dùng để chọn phần tử trong test, không thay thế screen-reader label hoặc role.",
    ],
    commonMistakes: [
      "Thêm test tag cho icon-only control không có label rồi cho rằng nó đã accessible.",
    ],
    productionNotes: [
      "Kiểm tra screen-reader focus, state announcement, touch target và semantics tree; chỉ dùng stable tag khi behavioral test cần selector.",
    ],
  },
  "state-driven-animation": {
    title: "Animation dẫn xuất từ state",
    description:
      "Chuyển animated value được điều khiển theo imperative sang Compose animation có target được dẫn xuất từ UI state hiện tại.",
    implementations: {
      "react-native": {
        name: "Animate một giá trị tường minh",
        summary:
          "Animated.Value được giữ lại và chạy đến target khi state thay đổi.",
      },
      kotlin: {
        name: "Animate target từ state",
        summary: "Animation đi theo target được dẫn xuất từ state hiện tại.",
      },
    },
    relationship:
      "Cả hai đều animate giá trị về target, nhưng Compose animation API thường được khai báo từ target state hiện tại thay vì khởi chạy effect cho từng thay đổi visual state thông thường.",
    mentalModel:
      "Giữ business/UI state là source of truth và animate biểu diễn trực quan về phía nó. Dùng animation một giá trị cho một property, AnimatedVisibility cho sự hiện diện và transition khi nhiều property cần cùng một state change.",
    differences: [
      "React Native Animated giữ animated value tường minh và thường bắt đầu timing hoặc spring; Compose animate*AsState dẫn xuất animated value trong composition.",
      "Compose animation label hỗ trợ tooling; nó không phải nội dung hiển thị cho người dùng hay test selector ổn định.",
    ],
    commonMistakes: [
      "Lưu animation progress như source of truth thứ hai cho việc content có expanded hoặc selected hay không.",
    ],
    productionNotes: [
      "Tôn trọng reduced-motion requirement, giữ animation độc lập với business correctness và profile list hoặc gesture motion phức tạp trên thiết bị mục tiêu.",
    ],
  },
  "gesture-abstractions": {
    title: "Gesture abstraction và pointer input",
    description:
      "Chọn gesture API ở mức cao nhất diễn đạt được interaction khi chuyển từ React Native responder sang Compose Modifier và pointer input.",
    implementations: {
      "react-native": {
        name: "Tương tác Pressable",
        summary:
          "Control mức cao sở hữu tap feedback và responder negotiation.",
      },
      kotlin: {
        name: "Tương tác Button",
        summary:
          "Standard Compose control có sẵn gesture, focus và accessibility behavior.",
      },
    },
    relationship:
      "Cả hai có high-level control và low-level input API, nhưng React Native thương lượng responder lifecycle, còn Compose phân tầng component, gesture Modifier và pointerInput handler với quy tắc event consumption riêng.",
    mentalModel:
      "Bắt đầu bằng standard control, sau đó là gesture Modifier và chỉ dùng pointerInput cho gesture thực sự tùy biến. Đừng xây lại tap từ raw pointer event khi control còn cần focus, keyboard support, visual feedback và semantics.",
    differences: [
      "Compose Button và clickable bao gồm nhiều interaction behavior hơn raw pointerInput; custom pointer code phải chủ động khôi phục semantics cần thiết.",
      "pointerInput block có key: đổi key sẽ khởi động lại handler, và top-level gesture detector nên dùng block riêng nếu cần chạy độc lập.",
    ],
    commonMistakes: [
      "Đặt tap và drag detector nối tiếp trong một pointerInput block khiến detector suspend đầu tiên chặn detector sau chạy.",
    ],
    productionNotes: [
      "Kiểm tra cancellation, nested scrolling, multi-touch, accessibility và touch target; chỉ dùng gesture library được duy trì khi sản phẩm cần khả năng vượt ngoài platform gesture API.",
    ],
  },
  "runtime-permissions": {
    title: "Runtime permission",
    description:
      "Yêu cầu Android capability nhạy cảm đúng ngữ cảnh, đồng thời tách OS prompt, rationale UI và feature state.",
    implementations: {
      "react-native": {
        name: "Yêu cầu Android permission",
        summary:
          "Một interaction yêu cầu dangerous permission và nhận kết quả.",
      },
      kotlin: {
        name: "Khởi chạy Activity Result contract",
        summary:
          "Compose đăng ký permission launcher và phản ứng với kết quả bất đồng bộ.",
      },
    },
    relationship:
      "Cả hai yêu cầu dangerous Android permission theo user intent, nhưng PermissionsAndroid resolve JavaScript promise, còn Compose tích hợp Android Activity Result launcher vào composition.",
    mentalModel:
      "Permission không phải feature state. Giải thích lợi ích bằng UI của ứng dụng, chỉ yêu cầu sau khi người dùng bắt đầu feature, rồi render feature outcome granted, denied hoặc degraded từ state.",
    differences: [
      "rememberLauncherForActivityResult của Compose đăng ký platform contract; nó không thay thế khai báo manifest hoặc Android permission policy.",
      "System dialog không thể tùy biến. Đặt rationale và recovery action trong app UI thay vì cố gắng nhét chúng vào request.",
    ],
    commonMistakes: [
      "Hiện prompt lúc app khởi động hoặc liên tục yêu cầu lại permission đã bị từ chối mà không có giải thích đúng ngữ cảnh và fallback dùng được.",
    ],
    productionNotes: [
      "Kiểm tra permission tại operation boundary, xử lý revoked permission, yêu cầu capability tối thiểu và chỉ dẫn đến settings sau khi giải thích vì sao feature không thể tiếp tục.",
    ],
  },
  "back-navigation": {
    title: "System back và thay đổi chưa lưu",
    description:
      "Xử lý Android back navigation có chủ đích, đồng thời để navigation stack vẫn là owner mặc định của back behavior thông thường.",
    implementations: {
      "react-native": {
        name: "Chặn hardware back press",
        summary:
          "Focused listener chỉ consume back khi màn hình có custom behavior.",
      },
      kotlin: {
        name: "Bật Compose back handler",
        summary:
          "BackHandler chỉ consume system back khi thay đổi chưa lưu cần được xác nhận.",
      },
    },
    relationship:
      "Cả hai đều có thể chặn Android system back cho custom flow tập trung, nhưng Compose BackHandler nhận biết composition/lifecycle còn Navigation Compose thông thường nên dùng navigation stack làm mặc định.",
    mentalModel:
      "Để navigation pop back stack trừ khi màn hình hiện tại có temporary state cụ thể cần xử lý như discard confirmation hoặc WebView history. Luôn gọi BackHandler và điều khiển nó bằng enabled state.",
    differences: [
      "React Native BackHandler listener chạy theo thứ tự đăng ký ngược; Compose BackHandler enabled ở trong cùng xử lý event.",
      "BackHandler dùng cho custom interception, không thay thế NavController.popBackStack() trong destination navigation thông thường.",
    ],
    commonMistakes: [
      "Cài back handler luôn enabled khiến navigation bị chặn, hoặc conditionally compose BackHandler làm handler precedence thay đổi sau recomposition.",
    ],
    productionNotes: [
      "Kiểm tra system button và gesture back, dialog, nested handler và predictive-back behavior trên Android version được hỗ trợ; giữ draft cho đến khi người dùng xác nhận discard.",
    ],
  },
  "ui-behavior-testing": {
    title: "Kiểm thử hành vi UI",
    description:
      "Kiểm thử hành vi và kết quả UI người dùng nhìn thấy trong React Native và Compose mà không gắn test với component internal.",
    implementations: {
      "react-native": {
        name: "Test user-visible interaction",
        summary:
          "Render màn hình, trigger press rồi assert điều người dùng quan sát được.",
      },
      kotlin: {
        name: "Test semantic interaction",
        summary:
          "Compose test tìm semantic node, thực hiện action rồi assert output hiển thị.",
      },
    },
    relationship:
      "Cả hai đều test rendered UI từ góc nhìn người dùng, nhưng React Native component test tool query React Native output còn Compose UI test query semantics tree.",
    mentalModel:
      "Chuẩn bị state tập trung, thực hiện action như người dùng rồi assert kết quả quan sát được. Tách screen content khỏi state owner để test rendering và intent contract mà không cần network hoặc navigation infrastructure.",
    differences: [
      "React Native component test chạy trong JavaScript và không xác thực native platform code; Compose UI test chạy theo Android UI semantics.",
      "Compose test selector thường dựa vào semantics; testTag là selector dự phòng chứ không phải assertion chính khi text hoặc accessible role đã diễn đạt hành vi.",
    ],
    commonMistakes: [
      "Assert private component state, ViewModel call hoặc snapshot lớn thay vì visible outcome của một interaction.",
    ],
    productionNotes: [
      "Chủ động điều khiển thời điểm hoàn tất tác vụ bất đồng bộ trong screen test để kiểm tra trạng thái chờ và hoàn tất mà không dùng sleep. Giữ một số ít end-to-end test trên thiết bị cho luồng quan trọng như authentication hoặc payment.",
    ],
  },
  "vertical-layout": {
    title: "Bố cục dọc",
    description:
      "Chuyển flex-direction column thành Compose Column với arrangement và alignment có chủ đích.",
    implementations: {
      "react-native": {
        name: "View column",
        summary:
          "View sắp xếp child theo chiều dọc khi flexDirection là column.",
      },
      kotlin: {
        name: "Column",
        summary:
          "Column sắp xếp child dọc với arrangement và alignment rõ ràng.",
      },
    },
    relationship:
      "Cả hai đặt child trên trục dọc và hỗ trợ spacing cùng cross-axis alignment.",
    mentalModel:
      "Trước hết ánh xạ main-axis intent: React Native column thành Column. Sau đó dịch cross-axis alignment và child sizing riêng.",
    differences: [
      "React Native dùng style object; Compose dùng typed parameter và Modifier.",
      "Nhiều ràng buộc riêng của child trong Compose đặt ở child Modifier.",
    ],
    commonMistakes: [
      "Đặt fillMaxSize hoặc weight sai child làm thay đổi không gian của sibling.",
    ],
    productionNotes: [
      "Dùng scroll container hoặc LazyColumn khi content có thể vượt viewport.",
    ],
  },
  "horizontal-layout": {
    title: "Bố cục ngang",
    description:
      "Chuyển flex-direction row thành Compose Row với phân phối không gian rõ ràng.",
    implementations: {
      "react-native": {
        name: "View row",
        summary: "View đặt child trên trục ngang.",
      },
      kotlin: {
        name: "Row",
        summary:
          "Row dùng weight cho flexible child và verticalAlignment cho cross axis.",
      },
    },
    relationship:
      "Row và flex row đều có horizontal main axis, nhưng Compose chia phần rộng còn lại bằng Modifier.weight.",
    mentalModel:
      "Chuyển flex: 1 trên row child thành weight(1f), rồi kiểm tra Modifier tác động đến dimension nào trong parent.",
    differences: [
      "Flex style của React Native giống CSS; Compose weight có scope Row hoặc Column.",
      "Compose dùng Spacer rõ ràng khi fixed gap dễ hiểu hơn.",
    ],
    commonMistakes: [
      "Kỳ vọng weight hoạt động ngoài Row/Column hoặc dùng nó khi cần intrinsic width.",
    ],
    productionNotes: [
      "Kiểm thử text dài, RTL, font scale lớn và màn hình hẹp.",
    ],
  },
  stack: {
    title: "Stack",
    description:
      "Chồng content bằng React Native absolute positioning hoặc Compose Box alignment.",
    implementations: {
      "react-native": {
        name: "Absolute-positioned View",
        summary: "Relative parent neo overlay child bằng absolute positioning.",
      },
      kotlin: {
        name: "Box",
        summary: "Box layer child và mỗi child có thể chọn alignment.",
      },
    },
    relationship:
      "Cả hai layer child; Box diễn tả common alignment rõ ràng mà không cần manual coordinate.",
    mentalModel:
      "Chỉ dùng stack khi visual relationship là overlap. Parent tạo coordinate space, overlay mô tả anchor của nó.",
    differences: [
      "React Native thường dùng position: absolute; Compose Box dùng Modifier.align.",
      "Compose draw order theo composition order nếu không cần zIndex.",
    ],
    commonMistakes: [
      "Dùng absolute positioning cho row/column thông thường, dễ vỡ với dynamic content và accessibility.",
    ],
    productionNotes: [
      "Đảm bảo overlay không che control cần thiết và vẫn accessible.",
    ],
  },
  grid: {
    title: "Lưới",
    description:
      "Render grid có thể mở rộng bằng FlatList columns hoặc LazyVerticalGrid với stable item identity.",
    implementations: {
      "react-native": {
        name: "FlatList columns",
        summary:
          "FlatList virtualize collection, numColumns điều khiển row layout.",
      },
      kotlin: {
        name: "LazyVerticalGrid",
        summary:
          "LazyVerticalGrid virtualize cell với adaptive hoặc fixed column.",
      },
    },
    relationship:
      "Cả hai virtualize collection lớn và cần stable key; Compose có lazy grid container riêng.",
    mentalModel:
      "Grid vẫn là lazy collection. Giữ identity, render từng cell độc lập và để layout thích nghi với width hiện có.",
    differences: [
      "FlatList thêm column cho list; Compose chọn LazyVerticalGrid rõ ràng.",
      "Compose dùng adaptive GridCells trong khi React Native thường tính dimension trong style.",
    ],
    commonMistakes: [
      "Dùng array index làm key hoặc lồng grid không giới hạn trong vertical scroll khác.",
    ],
    productionNotes: [
      "Xác định loading, empty, pagination và image-sizing trước khi tối ưu mật độ hiển thị.",
    ],
  },
  "secure-storage": {
    title: "Lưu trữ bảo mật",
    description:
      "Lưu credential bằng secure storage do nền tảng bảo vệ thay vì key-value preference store phổ thông.",
    implementations: {
      "react-native": {
        name: "react-native-keychain",
        summary:
          "Native Keychain hoặc Keystore wrapper lưu credential qua async API.",
      },
      kotlin: {
        name: "Android Keystore-backed storage",
        summary:
          "Storage abstraction mã hóa data bằng key do Android Keystore giữ.",
      },
    },
    relationship:
      "Cả hai ủy quyền bảo vệ key cho nền tảng qua asynchronous storage boundary.",
    mentalModel:
      "Secure storage giảm nguy cơ lộ secret đã lưu; nó không biến client không đáng tin thành trusted authority và không thay thế server authorization.",
    differences: [
      "React Native thường dùng cross-platform native wrapper.",
      "Android cần chọn Keystore-backed encryption strategy và device-authentication policy phù hợp.",
    ],
    commonMistakes: [
      "Đặt access token trong AsyncStorage thông thường hoặc log credential khi debug.",
    ],
    productionNotes: [
      "Giữ storage API nhỏ, clear secret khi sign-out, xử lý invalidated key và không xem client storage là bằng chứng identity.",
    ],
  },
  authentication: {
    title: "Xác thực",
    description:
      "Mô hình hóa signed-in state và session recovery tại app boundary, không phải điều kiện rải rác trong từng screen.",
    implementations: {
      "react-native": {
        name: "Auth provider và navigation gate",
        summary:
          "App-level state owner chọn public hoặc authenticated navigation theo session state.",
      },
      kotlin: {
        name: "Session ViewModel và navigation gate",
        summary:
          "Root composable collect immutable session state rồi chọn graph phù hợp.",
      },
    },
    relationship:
      "Cả hai để root state owner chọn public hoặc authenticated navigation sau session restoration.",
    mentalModel:
      "Authentication là state transition và navigation policy. Restore session một lần ở app boundary, rồi expose signed-in hoặc signed-out state tối giản cho UI.",
    differences: [
      "React Native thường dùng Context hoặc store riêng ở app root.",
      "Compose thường collect ViewModel StateFlow tại root route.",
    ],
    commonMistakes: [
      "Navigate từ từng API failure riêng lẻ hoặc cho rằng local token luôn hợp lệ mà không xử lý expiry và recovery.",
    ],
    productionNotes: [
      "Tách authentication khỏi authorization, centralize refresh, clear state atomically khi sign-out và luôn verify access ở server.",
    ],
  },
  pagination: {
    title: "Phân trang",
    description:
      "Tải collection lớn từng phần trong khi giữ stable item identity và append state rõ ràng.",
    implementations: {
      "react-native": {
        name: "FlatList onEndReached",
        summary:
          "List yêu cầu page tiếp theo gần cuối, append state ngăn work trùng lặp.",
      },
      kotlin: {
        name: "LazyColumn append state",
        summary:
          "Lazy list quan sát append availability và render footer từ explicit state.",
      },
    },
    relationship:
      "Cả hai quan sát gần cuối lazy list và yêu cầu page tiếp theo qua state owner.",
    mentalModel:
      "Pagination có initial, refresh, append, exhausted và append-error state riêng. Nó không chỉ là callback ở row cuối.",
    differences: [
      "FlatList có onEndReached trực tiếp.",
      "Compose cho app quan sát LazyListState hoặc dùng paging library khi abstraction đó thực sự cần.",
    ],
    commonMistakes: [
      "Gửi concurrent page request, mất cursor ordering hoặc thay item hiện có khi append đang chạy.",
    ],
    productionNotes: [
      "Ưu tiên server cursor, deduplicate bằng stable ID, giữ visible content khi append failure và retry đúng failed page.",
    ],
  },
  theme: {
    title: "Giao diện",
    description:
      "Cung cấp color, typography và dark-mode choice bằng design system dùng chung thay vì literal value rải rác.",
    implementations: {
      "react-native": {
        name: "Theme context",
        summary:
          "Provider expose semantic token theo appearance preference đã lưu.",
      },
      kotlin: {
        name: "MaterialTheme",
        summary:
          "Root composable áp dụng ColorScheme và typography cho toàn subtree.",
      },
    },
    relationship:
      "Cả hai cung cấp semantic design token từ app root để screen render nhất quán ở mỗi appearance mode.",
    mentalModel:
      "Theme là data đi xuống UI tree. Component cần semantic role như surface hoặc onSurface, không tự chọn raw color.",
    differences: [
      "React Native team định nghĩa/import token system và phân phối qua Context.",
      "Compose MaterialTheme làm color, typography và shape thành ambient value trong composition.",
    ],
    commonMistakes: [
      "Lưu theme preference nhưng không tôn trọng system appearance, hoặc hard-code color không dùng được dark mode.",
    ],
    productionNotes: [
      "Dùng semantic token, hỗ trợ system/default preference, test contrast và cập nhật appearance không flash khi khởi động.",
    ],
  },
  "error-handling": {
    title: "Xử lý lỗi",
    description:
      "Chuyển request failure thành UI phục hồi có chủ đích thay vì hiển thị raw transport error.",
    implementations: {
      "react-native": {
        name: "Typed failure UI",
        summary:
          "Một error state có thể phục hồi cung cấp retry action cho screen.",
      },
      kotlin: {
        name: "Recoverable sealed UI state",
        summary:
          "ViewModel ánh xạ expected failure thành displayable state và retry event.",
      },
    },
    relationship:
      "Cả hai chuyển expected failure thành UI state kèm recovery event; Compose thường dùng sealed state model để render đầy đủ các nhánh.",
    mentalModel:
      "Exception thuộc về ranh giới thực thi công việc. UI chỉ nên nhận một failure model nhỏ, có thể hành động thay vì HTTP client exception.",
    differences: [
      "JavaScript thường catch error quanh awaited promise; Kotlin xử lý exception quanh suspend work trong coroutine sở hữu nó.",
      "Kotlin cũng có thể mô hình hóa domain failure dự kiến bằng Result hoặc sealed type riêng.",
    ],
    commonMistakes: [
      "Hiển thị trực tiếp exception message cho người dùng hoặc xem cancellation là lỗi cần hiển thị.",
    ],
    productionNotes: [
      "Ánh xạ transport và parsing failure sang domain error ổn định, log chi tiết an toàn và cố gắng làm retry có tính idempotent.",
    ],
  },
  "local-storage": {
    title: "Lưu trữ cục bộ",
    description:
      "Lưu app preference nhỏ và cached value với AsyncStorage hoặc Android DataStore.",
    implementations: {
      "react-native": {
        name: "AsyncStorage",
        summary:
          "Key-value store dựa trên promise lưu các giá trị đã được serialize trên thiết bị.",
      },
      kotlin: {
        name: "Preferences DataStore",
        summary:
          "Flow có type đọc preference một cách reactive và edit transaction ghi cập nhật.",
      },
    },
    relationship:
      "Cả hai lưu key-value data, nhưng AsyncStorage đọc qua promise còn DataStore phát các cập nhật qua Flow.",
    mentalModel:
      "Storage là nguồn dữ liệu bất đồng bộ. Hãy đọc qua repository hoặc state holder; đừng làm output render phụ thuộc vào một disk read đồng bộ.",
    differences: [
      "AsyncStorage lưu string nên caller tự serialize giá trị.",
      "DataStore có transactional edit và reactive observation qua Flow.",
    ],
    commonMistakes: [
      "Lưu secret trong preference store phổ thông hoặc dùng storage làm source of truth duy nhất cho screen state.",
    ],
    productionNotes: [
      "Version stored schema, chọn default có chủ đích và xem persisted data lỗi định dạng là input có thể phục hồi.",
    ],
  },
} as const;

export const viRecipeTranslations = {
  "api-request": {
    title: "Gọi API",
    description: "Tải dữ liệu từ xa với trạng thái loading và error rõ ràng.",
    category: "networking",
    flow: [
      "Bắt đầu request",
      "Hiện trạng thái loading",
      "Xử lý response",
      "Render kết quả",
    ],
    implementationSummaries: {
      "react-native":
        "Fetch dữ liệu và cập nhật UI state dạng discriminated union.",
      kotlin: "Khởi chạy tác vụ từ ViewModel và cung cấp UI state bất biến.",
    },
    architectureNotes: [
      "Ẩn chi tiết transport sau ranh giới repository.",
      "Mô hình hóa rõ loading, success và failure; giữ nguyên coroutine cancellation và hiển thị thông báo lỗi an toàn cho người dùng.",
    ],
  },
  "refresh-token": {
    title: "Làm mới token",
    description:
      "Thử lại authenticated request sau khi làm mới access token đã hết hạn.",
    category: "xác thực",
    flow: ["Gửi request", "Nhận mã 401", "Làm mới token", "Thử lại một lần"],
    implementationSummaries: {
      "react-native": "Tập trung retry policy quanh một fetch wrapper.",
      kotlin: "Dùng OkHttp authenticator để làm mới token và thử lại một lần.",
    },
    architectureNotes: [
      "Chỉ làm mới một lần để tránh vòng lặp retry.",
      "Xem refresh thất bại là một chuyển đổi sang trạng thái đăng xuất.",
    ],
  },
  pagination: {
    title: "Phân trang",
    description:
      "Nối trang tiếp theo trong khi giữ ổn định các kết quả hiện có.",
    category: "danh sách",
    flow: [
      "Render item",
      "Cuộn đến cuối",
      "Tải cursor tiếp theo",
      "Nối thêm trang",
    ],
    implementationSummaries: {
      "react-native":
        "Chặn request cursor trùng và phục hồi khi tải trang tiếp theo lỗi.",
      kotlin: "Để Paging quản lý list state và UI loading khi nối trang.",
    },
    architectureNotes: [
      "Dùng cursor ổn định thay vì offset thay đổi.",
      "Ngăn request nối trang bị lặp và giữ các item đang hiển thị khi tải lỗi để người dùng thử lại.",
    ],
  },
  "secure-storage": {
    title: "Lưu trữ bảo mật",
    description:
      "Lưu credential nhạy cảm bằng kho mã hóa được nền tảng hỗ trợ.",
    category: "lưu trữ",
    flow: [
      "Nhận credential",
      "Mã hóa khi lưu",
      "Đọc khi cần",
      "Xóa khi đăng xuất",
    ],
    implementationSummaries: {
      "react-native": "Dùng secure-storage adapter thay vì AsyncStorage.",
      kotlin: "Ẩn encrypted preferences sau một credential-store interface.",
    },
    architectureNotes: [
      "Không lưu credential trong preferences thông thường.",
      "Xóa credential tại một ranh giới đăng xuất duy nhất.",
    ],
  },
  "biometric-login": {
    title: "Đăng nhập sinh trắc học",
    description: "Bảo vệ credential lưu cục bộ bằng biometric prompt.",
    category: "xác thực",
    flow: [
      "Yêu cầu xác thực sinh trắc học",
      "Xác minh người dùng",
      "Đọc credential",
      "Khôi phục phiên",
    ],
    implementationSummaries: {
      "react-native": "Tách biometric prompt khỏi quá trình khôi phục session.",
      kotlin: "Chỉ tiếp tục từ success callback của BiometricPrompt.",
    },
    architectureNotes: [
      "Sinh trắc học xác minh sự hiện diện cục bộ, không xác minh danh tính trên server.",
      "Cung cấp đường khôi phục khi người dùng hủy hoặc phần cứng không khả dụng.",
    ],
  },
  "deep-links": {
    title: "Deep link",
    description: "Điều hướng URL nhận được đến đúng đích bên trong ứng dụng.",
    category: "điều hướng",
    flow: [
      "Nhận URL",
      "Phân tích route",
      "Xác thực dữ liệu",
      "Điều hướng an toàn",
    ],
    implementationSummaries: {
      "react-native":
        "Ánh xạ URL pattern đến màn hình navigation qua một cấu hình duy nhất.",
      kotlin: "Khai báo URI pattern bên cạnh route của Navigation Compose.",
    },
    architectureNotes: [
      "Xác thực path parameter trước khi tải dữ liệu.",
      "Giữ định nghĩa route bên ngoài và trong ứng dụng đồng bộ.",
      "Đăng ký scheme và host trong Android manifest; khai báo và xác minh HTTPS App Links riêng.",
    ],
  },
} as const;

export const viRoadmapTranslations = {
  sections: {
    "kotlin-bridge": viKotlinBridgeRoadmapTranslations.section,
    "compose-runtime": viComposeRuntimeRoadmapTranslations.section,
    "ui-basics": "UI cơ bản",
    state: "State",
    forms: "Form",
    lifecycle: "Vòng đời",
    navigation: "Điều hướng",
    "async-networking": "Bất đồng bộ và networking",
    storage: "Lưu trữ",
    "app-architecture": "Kiến trúc ứng dụng",
  },
  lessons: {
    ...viKotlinBridgeRoadmapTranslations.lessons,
    ...viComposeRuntimeRoadmapTranslations.lessons,
    ...viLayoutMechanicsRoadmapTranslations,
    ...viAndroidPlatformRoadmapTranslations,
    ...viCoroutinesRoadmapTranslations,
    ...viArchitectureRoadmapTranslations,
    ...viBackgroundRoadmapTranslations,
    ...viFlowTestingRoadmapTranslations,
    ...viIntegrationTestingRoadmapTranslations,
    component: {
      title: "Component",
      exercise: "Viết lại profile card của React Native thành một composable.",
      checklist: ["Mô tả được input", "Phát ra được event"],
      stages: [
        "Render component nhỏ với input rõ ràng.",
        "Tách visual state khỏi user event.",
        "Giữ composable có thể tái sử dụng bằng cách truyền state và callback.",
      ],
    },
    props: {
      title: "Props và tham số",
      exercise:
        "Chuyển một React Native card có value và callback props được định kiểu thành stateless composable.",
      checklist: [
        "Truyền state bất biến đi xuống",
        "Phát user event qua callback",
      ],
      stages: [
        "Ánh xạ props object sang named parameter và function type của Kotlin.",
        "Giữ composable tái sử dụng ở trạng thái stateless bằng cách nhận value và event callback.",
        "Cung cấp UI contract tập trung thay vì truyền screen dependency hoặc ViewModel xuyên qua cây.",
      ],
    },
    children: {
      title: "Children và content slot",
      exercise:
        "Viết lại React Native panel nhận children thành Compose container có content slot.",
      checklist: [
        "Ánh xạ được children sang content lambda",
        "Dùng named slot khi container có nhiều vị trí chèn",
      ],
      stages: [
        "Nhận và gọi một @Composable content lambda.",
        "Tạo slot header, content và action riêng với trách nhiệm rõ ràng.",
        "Chỉ dùng scoped slot khi caller thực sự cần khả năng có cấu trúc, không dùng như abstraction mặc định.",
      ],
    },
    "conditional-ui": {
      title: "UI có điều kiện",
      exercise:
        "Tạo màn hình profile hiển thị loading, content và empty state mà không để lại UI cũ.",
      checklist: [
        "Giải thích được mỗi nhánh UI là mô tả của state hiện tại.",
        "Mô hình hóa rõ loading, content và empty state.",
      ],
      stages: [
        "Chọn giữa hai composable bằng if expression, tương tự conditional expression trong JSX.",
        "Render trọn một nhánh loading, content hoặc empty từ một screen state.",
        "Dùng sealed UI-state model để các trạng thái vẫn exhaustive khi tính năng phát triển.",
      ],
    },
    layout: {
      title: "Bố cục",
      exercise:
        "Tạo lại profile header React Native gồm avatar, tiêu đề và action bằng Row, Column và Modifier.",
      checklist: [
        "Ánh xạ được ý đồ row và column sang layout composable.",
        "Giải thích được vì sao thứ tự Modifier làm thay đổi kết quả.",
      ],
      stages: [
        "Đặt hai phần tử trong Row hoặc Column với alignment và spacing có chủ đích.",
        "Chuyển các flexbox layout phổ biến và đưa constraint riêng vào Modifier của từng child.",
        "Tách spacing và alignment lặp lại thành composable tập trung hoặc design token.",
      ],
    },
    "vertical-layout": {
      title: "Bố cục dọc",
      exercise: "Chuyển profile summary xếp dọc của React Native thành Column.",
      checklist: [
        "Ánh xạ đúng trục chính và trục chéo",
        "Tránh fill constraint không cần thiết",
      ],
      stages: [
        "Sắp xếp child theo chiều dọc bằng Column.",
        "Kiểm soát spacing, alignment và kích thước child có chủ đích.",
        "Chọn Column, scrolling hoặc LazyColumn theo giới hạn content.",
      ],
    },
    "horizontal-layout": {
      title: "Bố cục ngang",
      exercise:
        "Chuyển toolbar linh hoạt của React Native thành Row với một weighted child.",
      checklist: [
        "Chỉ dùng weight trong đúng scope",
        "Kiểm thử width hẹp và text dài",
      ],
      stages: [
        "Sắp xếp child theo chiều ngang bằng Row.",
        "Chuyển flex growth thành weight và alignment có scope.",
        "Xử lý RTL, font scale và width giới hạn.",
      ],
    },
    stack: {
      title: "Stack và overlay",
      exercise:
        "Đặt online badge trên avatar mà không dùng tọa độ màn hình cố định.",
      checklist: [
        "Dùng Box cho trường hợp overlap thực sự",
        "Giữ semantics của overlay accessible",
      ],
      stages: [
        "Layer hai child trong Box.",
        "Neo overlay bằng Modifier.align.",
        "Hỗ trợ kích thước thay đổi, clipping và accessibility.",
      ],
    },
    grid: {
      title: "Lưới",
      exercise: "Chuyển FlatList hai cột thành LazyVerticalGrid thích nghi.",
      checklist: [
        "Dùng stable item key",
        "Chọn fixed hoặc adaptive column có chủ đích",
      ],
      stages: [
        "Render lazy grid với số cột cố định.",
        "Điều chỉnh số cell theo width hiện có.",
        "Xử lý image size, empty state và collection lớn.",
      ],
    },
    list: {
      title: "Danh sách",
      exercise: "Chuyển một row của FlatList thành item của LazyColumn.",
      checklist: ["Dùng stable key", "Xử lý loading state"],
      stages: [
        "Render một collection nhỏ.",
        "Xử lý tương tác item và empty state.",
        "Dùng identity ổn định và ranh giới phân trang.",
      ],
    },
    "text-input": {
      title: "Nhập văn bản",
      exercise:
        "Chuyển name field được điều khiển trong React Native thành Compose TextField được hoist state, với validation do parent sở hữu.",
      checklist: [
        "Theo dõi được value đi xuống và edit event đi lên.",
        "Xác định được vì sao field trở thành chỉ đọc khi state không được cập nhật.",
      ],
      stages: [
        "Render TextField với value và onValueChange theo controlled-input model.",
        "Hoist giá trị field để parent phối hợp validation, label và submit.",
        "Giữ field tái sử dụng tập trung vào trình bày, còn form state thuộc screen state owner.",
      ],
    },
    "local-state": {
      title: "State cục bộ",
      exercise: "Chuyển counter từ useState sang state được remember.",
      checklist: [
        "Giải thích được recomposition",
        "Biết khi nào cần hoist state",
      ],
      stages: [
        "Cập nhật UI state cục bộ.",
        "Hoist state cho child có thể tái sử dụng.",
        "Chọn ViewModel hoặc saveable state khi vòng đời thay đổi.",
      ],
    },
    "derived-state": {
      title: "State dẫn xuất",
      exercise:
        "Xóa total state bị trùng trong giỏ hàng và dẫn xuất total từ danh sách item hiện tại.",
      checklist: [
        "Giữ một source of truth",
        "Biết khi nào memoization không cần thiết",
      ],
      stages: [
        "Tính trực tiếp một giá trị ít tốn kém từ tham số hiện tại.",
        "Loại bỏ mutable state đồng bộ và dẫn xuất dữ liệu UI đã lọc hoặc tổng hợp.",
        "Chỉ dùng derivedStateOf khi state đổi thường xuyên hơn kết quả UI và profiling chứng minh cần thiết.",
      ],
    },
    "global-state": {
      title: "State màn hình và state dùng chung",
      exercise:
        "Chuyển màn hình profile từ external React store sang UI state bất biến do ViewModel sở hữu.",
      checklist: [
        "Chọn state owner thấp nhất phù hợp",
        "Collect StateFlow có nhận biết lifecycle",
      ],
      stages: [
        "Cung cấp screen state bất biến và intent method từ ViewModel.",
        "Collect state trong route composable rồi truyền plain value và callback cho screen content.",
        "Scope mỗi state holder vào đúng destination hoặc navigation graph và chỉ lưu state cần thiết.",
      ],
    },
    "side-effects": {
      title: "Side effect",
      exercise:
        "Phân loại ba React effect thành công việc của composition, đăng ký cần dispose hoặc công việc của ViewModel trước khi chuyển đổi.",
      checklist: [
        "Chọn effect API theo quyền sở hữu",
        "Dùng effect key có chủ đích",
      ],
      stages: [
        "Chạy suspend UI task bằng LaunchedEffect với key có ý nghĩa.",
        "Phân biệt LaunchedEffect, DisposableEffect và công việc thuộc ngoài composition.",
        "Giữ effect API tập trung vào UI và làm rõ cancellation, restart behavior cùng quyền sở hữu.",
      ],
    },
    "state-driven-animation": {
      title: "Animation dẫn xuất từ state",
      exercise:
        "Animate favorite action, filter panel và card mở rộng, đồng thời giữ semantic state độc lập với visual progress.",
      checklist: [
        "Dùng UI state làm animation target thay vì lưu progress state trùng lặp",
        "Chọn animation một giá trị, AnimatedVisibility hoặc transition theo visual behavior",
      ],
      stages: [
        "Animate một visual property từ favorite state hiện tại.",
        "Animate panel đi vào và rời khỏi UI tree.",
        "Điều phối các visual property liên quan qua một transition state mà không ảnh hưởng business correctness.",
      ],
    },
    lifecycle: {
      title: "Vòng đời và cleanup",
      exercise:
        "Chuyển React subscription có cleanup thành DisposableEffect đăng ký và gỡ đúng một observer.",
      checklist: [
        "Gỡ mọi observer được đăng ký thủ công",
        "Không nhầm recomposition với lifecycle entry",
      ],
      stages: [
        "Đăng ký listener và gỡ trong onDispose.",
        "Chỉ đăng ký lại khi resource owner hoặc key thực sự thay đổi.",
        "Ưu tiên adapter nhận biết lifecycle cho observable state và chỉ dispose thủ công với external listener API.",
      ],
    },
    form: {
      title: "Form state và validation",
      exercise:
        "Tạo form đăng nhập có email field được điều khiển, validation dẫn xuất và submit state rõ ràng.",
      checklist: [
        "Tách field state khỏi server state",
        "Dẫn xuất validation thay vì đồng bộ nó",
      ],
      stages: [
        "Sở hữu value của field và dẫn xuất kết quả validation đơn giản.",
        "Hoist value để parent phối hợp nhiều field và submit event.",
        "Mô hình hóa submitting, error, correction và success mà không gắn field tái sử dụng với ViewModel.",
      ],
    },
    button: {
      title: "Button và sự kiện nhấn",
      exercise:
        "Chuyển Pressable đang lưu thành Button có enabled state rõ ràng.",
      checklist: [
        "Phát intent qua callback",
        "Ngăn action không idempotent chạy trùng",
      ],
      stages: [
        "Xử lý một button action.",
        "Render enabled, disabled và loading state.",
        "Đáp ứng semantics, touch target và idempotency.",
      ],
    },
    "accessibility-semantics": {
      title: "Accessibility semantics và test tag",
      exercise:
        "Chuyển favorite action chỉ có icon thành toggle có label, rồi thêm test selector mà không dùng nó làm accessibility text.",
      checklist: [
        "Dùng standard control khi built-in semantics phù hợp với interaction",
        "Tách test identifier khỏi label, role và state announcement",
      ],
      stages: [
        "Gắn screen-reader label có ý nghĩa và button role cho icon-only action.",
        "Cung cấp checked state của custom favorite toggle.",
        "Thêm stable test selector mà không thay thế semantics dành cho người dùng.",
      ],
    },
    "gesture-abstractions": {
      title: "Gesture abstraction và pointer input",
      exercise:
        "Tạo tap, swipe offset và long-press reorder handle, đồng thời chọn gesture abstraction nhỏ nhất vẫn giữ accessibility và cancellation.",
      checklist: [
        "Dùng standard control hoặc gesture Modifier trước raw pointer input",
        "Giải thích pointerInput key và event consumption của custom gesture",
      ],
      stages: [
        "Dùng standard action control thay vì tự xử lý tap responder.",
        "Chuyển horizontal drag thành UI-owned offset state.",
        "Chỉ dùng long-press drag detector cho custom gesture và consume event có chủ đích.",
      ],
    },
    navigation: {
      title: "Điều hướng",
      exercise:
        "Đưa profile navigation action ra khỏi presentational screen và đặt vào route-level callback.",
      checklist: [
        "Giữ NavController tại route boundary",
        "Giải thích được quyền sở hữu back stack",
      ],
      stages: [
        "Điều hướng giữa hai destination qua graph.",
        "Truyền navigation callback vào screen content thay vì controller.",
        "Tổ chức graph theo scope và kiểm thử navigation behavior độc lập với destination UI.",
      ],
    },
    "back-navigation": {
      title: "System back và thay đổi chưa lưu",
      exercise:
        "Giữ normal back-stack navigation, sau đó chỉ yêu cầu xác nhận khi edit draft có thay đổi chưa lưu.",
      checklist: [
        "Để navigation stack xử lý back navigation thông thường",
        "Dùng enabled state thay vì conditionally compose BackHandler",
      ],
      stages: [
        "Chỉ chặn system back khi draft chưa lưu cần được quyết định.",
        "Hiện discard dialog và chỉ pop back stack sau khi người dùng xác nhận.",
        "Giữ handler composition ổn định và kiểm tra system, gesture, dialog cùng nested back behavior.",
      ],
    },
    "route-parameters": {
      title: "Tham số route",
      exercise:
        "Thay full user object trong navigation param bằng user ID và tải profile hiện tại tại destination.",
      checklist: [
        "Chỉ truyền route data có thể tuần tự hóa",
        "Validate destination argument",
      ],
      stages: [
        "Truyền compact identifier qua route.",
        "Decode identifier tại route boundary rồi truyền vào screen content.",
        "Giữ route schema ổn định và resolve dữ liệu hiện tại đã được cấp quyền ngoài navigation payload.",
      ],
    },
    "deep-link": {
      title: "Deep link",
      exercise:
        "Cấu hình profile URL pattern và từ chối profile identifier không hợp lệ trước khi tải dữ liệu.",
      checklist: [
        "Xem URL là input không đáng tin",
        "Giữ link pattern đồng bộ với route",
      ],
      stages: [
        "Ánh xạ một URL pattern vào destination.",
        "Parse và validate route data trước khi render destination.",
        "Phối hợp platform link registration, authorization và hành vi điều hướng trong ứng dụng.",
      ],
    },
    "loading-state": {
      title: "Trạng thái tải",
      exercise:
        "Render initial loading, refresh và empty result thành các state khác nhau cho một profile list.",
      checklist: [
        "Không dùng null để biểu thị mọi state chưa sẵn sàng",
        "Giải thích được refresh policy",
      ],
      stages: [
        "Render một trạng thái đang chạy rõ ràng.",
        "Mô hình hóa loading, ready và empty result mà không chồng lấp ý nghĩa.",
        "Giữ content hữu ích khi refresh nếu trải nghiệm sản phẩm cần điều đó.",
      ],
    },
    "error-handling": {
      title: "Xử lý lỗi",
      exercise:
        "Ánh xạ offline request failure sang copy thân thiện và retry event mà không lộ raw exception.",
      checklist: [
        "Tách cancellation khỏi failure",
        "Cung cấp recovery action có chủ đích",
      ],
      stages: [
        "Render một error state có thể phục hồi.",
        "Ánh xạ transport error thành displayable failure model và retry event.",
        "Giữ diagnostic an toàn trong khi trình bày user copy ổn định, có thể dịch.",
      ],
    },
    "local-storage": {
      title: "Lưu trữ cục bộ",
      exercise:
        "Lưu theme preference, tải default an toàn và cập nhật screen khi stored value thay đổi.",
      checklist: [
        "Xem persisted data là input không đáng tin",
        "Giữ storage access ngoài reusable UI",
      ],
      stages: [
        "Đọc và ghi bất đồng bộ một preference nhỏ.",
        "Expose stored preference qua state holder thay vì trực tiếp từ UI component.",
        "Version stored value, phục hồi khi data lỗi và chọn store phù hợp cho độ nhạy cảm và quy mô.",
      ],
    },
    async: {
      title: "Tác vụ bất đồng bộ",
      exercise:
        "Thay request chạy qua effect bằng coroutine nhận biết lifecycle.",
      checklist: ["Hiểu cơ chế hủy", "Không chạy công việc trong composition"],
      stages: [
        "Khởi chạy tác vụ bất đồng bộ từ effect được kiểm soát.",
        "Khởi động lại tác vụ khi key thay đổi.",
        "Giữ tác vụ sống lâu trong ViewModel.",
      ],
    },
    "api-request": {
      title: "Gọi API",
      exercise: "Mô hình hóa loading, success và failure cho request profile.",
      checklist: ["Mô hình hóa từng trạng thái", "Tách transport khỏi UI"],
      stages: [
        "Render loading và success.",
        "Thêm retry và error UI.",
        "Cung cấp UI state bất biến từ ViewModel có repository hỗ trợ.",
      ],
    },
    pagination: {
      title: "Phân trang",
      exercise:
        "Nối thêm page dựa trên cursor, giữ row hiện có và hỗ trợ retry khi append lỗi.",
      checklist: ["Chặn request trùng", "Tách initial state khỏi append state"],
      stages: [
        "Tải page thứ hai từ ranh giới list.",
        "Mô hình hóa cursor, exhausted và append-error state.",
        "Loại item trùng bằng stable ID và giữ content khi retry.",
      ],
    },
    "secure-storage": {
      title: "Lưu trữ bảo mật",
      exercise:
        "Chuyển refresh token khỏi preference thông thường sang secure credential-store interface.",
      checklist: [
        "Không bao giờ log credential",
        "Xử lý key invalidation và dọn dữ liệu khi sign-out",
      ],
      stages: [
        "Đọc, ghi và xóa một credential qua abstraction.",
        "Dùng platform-backed key protection và phục hồi khi data không khả dụng.",
        "Định nghĩa policy cho rotation, invalidation, backup và sign-out.",
      ],
    },
    authentication: {
      title: "Xác thực",
      exercise:
        "Tạo một root session gate cho restoring, signed-out và signed-in state.",
      checklist: [
        "Tách authentication khỏi authorization",
        "Tập trung session transition tại một nơi",
      ],
      stages: [
        "Chọn public hoặc authenticated graph từ state.",
        "Restore và refresh session qua một state owner.",
        "Xử lý expiry, concurrent refresh, revocation và atomic sign-out.",
      ],
    },
    "runtime-permissions": {
      title: "Runtime permission",
      exercise:
        "Chỉ yêu cầu camera sau scan action, hiển thị fallback khi bị từ chối và giải thích lợi ích của feature trước OS dialog.",
      checklist: [
        "Yêu cầu capability tối thiểu trong ngữ cảnh user intent",
        "Render denied state có thể sử dụng thay vì giả định request thành công",
      ],
      stages: [
        "Khởi chạy camera permission request từ user action rõ ràng.",
        "Render feature fallback vẫn hoạt động khi capability bị từ chối.",
        "Giải thích lợi ích của feature bằng app UI trước system-owned permission dialog.",
      ],
    },
    theme: {
      title: "Giao diện",
      exercise:
        "Ánh xạ semantic token của React Native sang Material color scheme sáng và tối.",
      checklist: [
        "Dùng semantic color role",
        "Hỗ trợ system, light và dark preference",
      ],
      stages: [
        "Áp dụng color và typography qua MaterialTheme.",
        "Lưu lựa chọn người dùng trong khi vẫn hỗ trợ system default.",
        "Kiểm tra contrast, dynamic change và hành vi lúc khởi động.",
      ],
    },
    "ui-behavior-testing": {
      title: "Kiểm thử hành vi UI",
      exercise:
        "Kiểm thử một thao tác hiển thị, contract của màn hình tái sử dụng được và thao tác lưu bất đồng bộ từ lúc chờ đến khi hoàn tất, không kiểm tra state nội bộ của component.",
      checklist: [
        "Assert kết quả người dùng quan sát được sau interaction",
        "Chủ động điều khiển thời điểm hoàn tất tác vụ bất đồng bộ, không dùng sleep hoặc kiểm tra state nội bộ",
      ],
      stages: [
        "Nhấn một action hiển thị và assert kết quả được render.",
        "Test stateless screen bằng plain state và callback contract.",
        "Với callback lưu bất đồng bộ, chủ động điều khiển lúc hoàn tất và kiểm tra cả trạng thái chờ lẫn trạng thái hoàn tất mà người dùng nhìn thấy.",
      ],
    },
  },
  stageTitles: ["Cơ bản", "Áp dụng", "Production"],
} as const;
