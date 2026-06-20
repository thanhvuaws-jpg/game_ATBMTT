// data.js — toàn bộ nội dung game, tách riêng để dễ chỉnh sửa

const GAME_DATA = {

  // ─── CHƯƠNG 1: Tutorial dialogue ───────────────────────────────────────────
  chapter1: {
    dialogues: [
      {
        speaker: "mai",
        name: "Chị Mai",
        subtitle: "Giám đốc SOC",
        text: "Chào mừng Long đến với Trung tâm Giám sát An ninh mạng. Từ hôm nay em chính thức là thành viên đội phản ứng sự cố của chúng ta."
      },
      {
        speaker: "long",
        name: "Long",
        subtitle: "Chuyên viên SOC mới",
        text: "Dạ, em cảm ơn chị! Em sẵn sàng bắt đầu. Nhưng... \"không gian mạng\" mà chúng ta bảo vệ là gì ạ?"
      },
      {
        speaker: "mai",
        name: "Chị Mai",
        subtitle: "Giám đốc SOC",
        text: "Câu hỏi hay! Không gian mạng là môi trường số nơi thông tin được tạo ra, lưu trữ, truyền đi và xử lý — bao gồm mạng viễn thông, Internet, hệ thống máy tính, cơ sở dữ liệu và mọi thiết bị kết nối với nhau."
      },
      {
        speaker: "mai",
        name: "Chị Mai",
        subtitle: "Giám đốc SOC",
        text: "An ninh mạng là đảm bảo không gian mạng đó hoạt động an toàn, ổn định — không bị xâm phạm, gây rối loạn, hoặc sử dụng sai mục đích gây hại cho cá nhân, tổ chức hay quốc gia."
      },
      {
        speaker: "long",
        name: "Long",
        subtitle: "Chuyên viên SOC mới",
        text: "Vậy công việc của mình là... theo dõi và ngăn chặn các mối đe dọa trong không gian đó?"
      },
      {
        speaker: "mai",
        name: "Chị Mai",
        subtitle: "Giám đốc SOC",
        text: "Chính xác! Nhưng không chỉ ngăn chặn — mình còn phải nhận biết đúng loại mối đe dọa, xử lý đúng quy trình, và phối hợp với cơ quan chức năng khi cần. Luật An ninh mạng 2025 quy định rõ điều này."
      },
      {
        speaker: "mai",
        name: "Chị Mai",
        subtitle: "Giám đốc SOC",
        text: "Trước khi bắt đầu nhận ca, em hãy trả lời vài câu hỏi nhanh để chị biết em đã nắm cơ bản chưa nhé."
      }
    ],
    quiz: [
      {
        question: "Không gian mạng bao gồm yếu tố nào sau đây?",
        options: [
          "Chỉ là Internet và mạng xã hội",
          "Mạng viễn thông, Internet, hệ thống máy tính, cơ sở dữ liệu và thiết bị kết nối",
          "Chỉ các thiết bị vật lý như máy tính và điện thoại",
          "Chỉ là phần mềm và ứng dụng"
        ],
        correct: 1,
        explanation: "Không gian mạng là môi trường số toàn diện — bao gồm hạ tầng viễn thông, Internet, hệ thống thông tin, cơ sở dữ liệu và tất cả thiết bị kết nối với nhau."
      },
      {
        question: "Mục tiêu chính của an ninh mạng là gì?",
        options: [
          "Ngăn chặn mọi người truy cập Internet",
          "Bảo đảm không gian mạng hoạt động an toàn, ổn định, không bị xâm phạm hay sử dụng sai mục đích",
          "Theo dõi tất cả hoạt động trực tuyến của người dùng",
          "Chỉ bảo vệ các hệ thống của chính phủ"
        ],
        correct: 1,
        explanation: "An ninh mạng hướng đến bảo đảm sự an toàn và ổn định của không gian mạng cho tất cả — cá nhân, tổ chức và quốc gia."
      },
      {
        question: "Khi phát hiện sự cố an ninh mạng nghiêm trọng, đội SOC cần làm gì?",
        options: [
          "Tự xử lý hoàn toàn, không cần báo ai",
          "Xử lý nội bộ và phối hợp báo cáo cơ quan chức năng theo quy định pháp luật",
          "Chờ lãnh đạo cấp cao quyết định",
          "Đăng lên mạng xã hội để cảnh báo cộng đồng"
        ],
        correct: 1,
        explanation: "Theo Luật An ninh mạng 2025, tổ chức có trách nhiệm phối hợp với cơ quan chức năng — không được tự ý che giấu sự cố ảnh hưởng đến hệ thống quan trọng."
      },
      {
        question: "Mục đích chính của Nghị định 13/2023/NĐ-CP là gì?",
        options: [
          "Quản lý việc quảng cáo trên mạng xã hội",
          "Quy định chi tiết về các biện pháp bảo vệ dữ liệu cá nhân tại Việt Nam",
          "Cấm người dân sử dụng dịch vụ Internet nước ngoài",
          "Thu thuế thu nhập cá nhân của những lập trình viên"
        ],
        correct: 1,
        explanation: "Nghị định 13/2023/NĐ-CP quy định chi tiết về bảo vệ dữ liệu cá nhân và trách nhiệm bảo vệ dữ liệu cá nhân của cơ quan, tổ chức, cá nhân có liên quan."
      },
      {
        question: "Theo quy định pháp luật Việt Nam, cơ quan nào chuyên trách bảo vệ an ninh mạng thuộc Bộ Công an?",
        options: [
          "Cục An toàn thông tin (Bộ Thông tin và Truyền thông)",
          "Cục An ninh mạng và phòng, chống tội phạm sử dụng công nghệ cao (A05)",
          "Cục Kỹ thuật nghiệp vụ",
          "Bộ Tư lệnh Tác chiến không gian mạng (Bộ Quốc phòng)"
        ],
        correct: 1,
        explanation: "A05 thuộc Bộ Công an là lực lượng chuyên trách bảo vệ an ninh mạng hàng đầu tại Việt Nam."
      },
      {
        question: "Khi nhận được một email từ người lạ thông báo trúng thưởng xe máy điện VinFast kèm đường link yêu cầu xác nhận, hành động nào là đúng?",
        options: [
          "Bấm vào link ngay để nhận thưởng kẻo hết hạn",
          "Nhập thông tin cá nhân và số điện thoại để họ liên hệ lại",
          "Không nhấp vào link, báo cáo email nghi ngờ cho bộ phận bảo mật/IT",
          "Chuyển tiếp email này cho bạn bè để cùng trúng thưởng"
        ],
        correct: 2,
        explanation: "Đây là dấu hiệu điển hình của email lừa đảo (phishing). Tuyệt đối không click vào đường link lạ để phòng tránh bị chiếm đoạt tài khoản hoặc nhiễm mã độc."
      },
      {
        question: "Khái niệm 'Phishing' trong an toàn thông tin được hiểu như thế nào?",
        options: [
          "Hành vi sử dụng phần mềm để quét các cổng mạng đang mở",
          "Tấn công lừa đảo giả mạo các tổ chức uy tín để dụ người dùng cung cấp thông tin nhạy cảm",
          "Tấn công từ chối dịch vụ làm sập hệ thống website",
          "Việc người dùng quên mật khẩu và phải đăng ký tài khoản mới"
        ],
        correct: 1,
        explanation: "Phishing là phương thức tấn công kỹ nghệ xã hội (social engineering), giả mạo thực thể đáng tin cậy để đánh cắp mật khẩu, OTP, số thẻ..."
      },
      {
        question: "Thông tin nào sau đây thuộc nhóm dữ liệu cá nhân nhạy cảm theo Nghị định 13/2023/NĐ-CP?",
        options: [
          "Họ và tên khai sinh",
          "Tình trạng sức khỏe, đời tư, dữ liệu sinh trắc học và vị trí địa lý thực tế",
          "Địa chỉ liên hệ",
          "Số điện thoại di động thông thường"
        ],
        correct: 1,
        explanation: "Dữ liệu sinh trắc học, sức khỏe, định vị và quan điểm chính trị... được xếp vào dữ liệu cá nhân nhạy cảm, yêu cầu quy trình bảo vệ nghiêm ngặt hơn."
      },
      {
        question: "Lỗ hổng bảo mật 'Zero-day' nghĩa là gì?",
        options: [
          "Lỗ hổng đã tồn tại 0 ngày và đã được vá xong",
          "Lỗ hổng bảo mật chưa được công bố hoặc chưa có bản vá chính thức từ nhà sản xuất",
          "Lỗ hổng chỉ xảy ra vào ngày đầu tiên của năm",
          "Lỗi thiết kế phần cứng không bao giờ vá được"
        ],
        correct: 1,
        explanation: "Zero-day chỉ những lỗ hổng chưa được biết đến hoặc chưa có bản vá bảo mật, khiến tin tặc dễ dàng khai thác thành công."
      },
      {
        question: "Hệ thống xác thực đa yếu tố (MFA) hoạt động dựa trên nguyên lý nào?",
        options: [
          "Sử dụng nhiều mật khẩu dài khác nhau cho cùng một tài khoản",
          "Kết hợp ít nhất 2 yếu tố xác thực độc lập như mật khẩu và mã OTP gửi qua điện thoại",
          "Đăng nhập tài khoản trên nhiều thiết bị cùng lúc",
          "Yêu cầu cả họ tên và ngày sinh khi đăng ký tài khoản"
        ],
        correct: 1,
        explanation: "MFA tăng cường bảo mật bằng cách yêu cầu nhiều lớp xác thực độc lập (thứ bạn biết, thứ bạn có, hoặc thứ là bạn)."
      },
      {
        question: "Chủ quản hệ thống thông tin có nghĩa vụ gì khi phát hiện sự cố an ninh mạng gây ảnh hưởng đến hệ thống?",
        options: [
          "Giấu kín thông tin để tránh ảnh hưởng đến giá cổ phiếu",
          "Báo cáo ngay cho cơ quan chuyên trách bảo vệ an ninh mạng có thẩm quyền và áp dụng biện pháp ứng phó kịp thời",
          "Chỉ xử lý khi có yêu cầu bằng văn bản từ cơ quan công an",
          "Đăng bài lên mạng xã hội giải trình lý do bị hack"
        ],
        correct: 1,
        explanation: "Báo cáo kịp thời giúp các cơ quan chức năng hỗ trợ ngăn chặn thiệt hại lan rộng và điều tra nguồn gốc tấn công."
      },
      {
        question: "Rủi ro lớn nhất của việc tái sử dụng một mật khẩu cho nhiều tài khoản trực tuyến khác nhau là gì?",
        options: [
          "Dễ bị quên mật khẩu",
          "Bị tấn công 'Credential Stuffing' (nếu một tài khoản bị rò rỉ, tin tặc sẽ thử đăng nhập thành công vào các tài khoản khác)",
          "Tài khoản sẽ bị hệ thống tự động khóa sau 30 ngày",
          "Mật khẩu sẽ tự động đổi độ dài"
        ],
        correct: 1,
        explanation: "Sử dụng mật khẩu trùng lặp tạo điều kiện cho tin tặc dùng dữ liệu rò rỉ từ trang web yếu để hack hàng loạt tài khoản khác của bạn."
      },
      {
        question: "Phương thức hoạt động phổ biến nhất của mã độc tống tiền (Ransomware) là gì?",
        options: [
          "Tự động gửi email rác đến toàn bộ danh bạ người dùng",
          "Mã hóa toàn bộ tệp tin quan trọng trên máy nạn nhân và yêu cầu chuyển tiền mã hóa để nhận chìa khóa giải mã",
          "Tự động nâng cấp hệ điều hành lên phiên bản mới nhất",
          "Làm hỏng hoàn toàn ổ cứng vật lý của máy tính"
        ],
        correct: 1,
        explanation: "Ransomware khóa quyền truy cập dữ liệu của bạn bằng mã hóa mạnh, sau đó tống tiền (thường qua Bitcoin) để chuộc lại khóa giải mã."
      },
      {
        question: "Theo pháp luật Việt Nam, việc thu thập dữ liệu cá nhân của trẻ em từ đủ 7 tuổi cần có sự đồng ý của ai?",
        options: [
          "Chỉ cần sự đồng ý của bản thân đứa trẻ đó",
          "Sự đồng ý của cả trẻ em và cha, mẹ hoặc người giám hộ hợp pháp",
          "Chỉ cần sự đồng ý của giáo viên chủ nhiệm lớp học",
          "Không cần sự đồng ý của bất kỳ ai"
        ],
        correct: 1,
        explanation: "Theo Nghị định 13, xử lý dữ liệu trẻ em từ đủ 7 tuổi trở lên cần có sự đồng ý của cả cha mẹ/người giám hộ và chính đứa trẻ."
      },
      {
        question: "Hành động nào sau đây là an toàn nhất khi bạn buộc phải kết nối Wi-Fi công cộng tại quán cà phê để xử lý công việc nhạy cảm?",
        options: [
          "Tắt hoàn toàn tường lửa của máy tính để tăng tốc kết nối",
          "Sử dụng mạng riêng ảo (VPN) để mã hóa toàn bộ dữ liệu truyền tải trên mạng",
          "Mở tính năng chia sẻ tệp tin và máy in công khai",
          "Chỉ truy cập các trang web HTTP không bảo mật"
        ],
        correct: 1,
        explanation: "VPN tạo một đường truyền mã hóa an toàn, ngăn chặn việc tin tặc bắt gói tin trên Wi-Fi công cộng để đọc trộm dữ liệu của bạn."
      }
    ]
  },

  // ─── CHƯƠNG 2: Kéo-thả phân loại ──────────────────────────────────────────
  chapter2: {
    intro: "Nhận dạng đúng loại mối đe dọa là bước đầu tiên để xử lý đúng quy trình. Kéo từng thẻ tình huống vào đúng danh mục.",
    cards: [
      {
        id: "c2_1",
        title: "Tình huống 1",
        description: "Nhóm hacker từ nước ngoài chiếm quyền điều khiển toàn bộ server trung tâm của ngân hàng, làm sập hệ thống giao dịch trong 6 giờ liên tục.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — hành vi dùng phương tiện công nghệ để kiểm soát và làm gián đoạn hệ thống thông tin của tổ chức.",
        hint: "Chú ý: chiếm quyền điều khiển server và làm sập hệ thống"
      },
      {
        id: "c2_2",
        title: "Tình huống 2",
        description: "Một cá nhân gửi hàng loạt tin nhắn giả mạo người thân đang gặp nạn, lừa nạn nhân chuyển khoản 'giúp đỡ khẩn cấp'.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — hành vi lừa đảo chiếm đoạt tài sản thực hiện qua không gian mạng, cấu thành tội phạm theo Bộ luật Hình sự.",
        hint: "Chú ý: lừa đảo tài sản qua mạng"
      },
      {
        id: "c2_3",
        title: "Tình huống 3",
        description: "Cuộc tấn công DDoS với hàng triệu request mỗi giây làm tê liệt hoàn toàn cổng thông tin điện tử của cơ quan chính phủ.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — DDoS (tấn công từ chối dịch vụ phân tán) nhằm gây gián đoạn, tê liệt hệ thống là hình thức tấn công mạng điển hình.",
        hint: "Chú ý: gây tê liệt hệ thống bằng công nghệ"
      },
      {
        id: "c2_4",
        title: "Tình huống 4",
        description: "Ransomware mã hóa toàn bộ dữ liệu bệnh viện, tin tặc đòi 50 Bitcoin mới giải mã. Hệ thống cấp cứu tê liệt.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Ransomware vừa là TẤN CÔNG MẠNG (xâm nhập, kiểm soát, gây tê liệt hệ thống) vừa là TỘI PHẠM MẠNG (tống tiền — cấu thành tội hình sự).",
        hint: "Trường hợp đặc biệt — đọc kỹ mô tả"
      },
      {
        id: "c2_5",
        title: "Tình huống 5",
        description: "Tài khoản mạng xã hội ẩn danh liên tục chia sẻ nội dung khiêu dâm trẻ em trong các nhóm kín.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — phát tán nội dung khiêu dâm trẻ em là tội phạm hình sự nghiêm trọng, bất kể thực hiện qua kênh nào.",
        hint: "Chú ý: loại nội dung và đối tượng"
      },
      {
        id: "c2_6",
        title: "Tình huống 6",
        description: "Nhóm tin tặc xâm nhập database của công ty bán lẻ, đánh cắp thông tin 2 triệu thẻ tín dụng khách hàng.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — xâm nhập trái phép vào cơ sở dữ liệu và đánh cắp thông tin là hành vi tấn công hệ thống thông tin.",
        hint: "Chú ý: xâm nhập hệ thống và đánh cắp dữ liệu"
      },
      {
        id: "c2_7",
        title: "Tình huống 7",
        description: "Một cá nhân vận hành trang web cho phép đặt cược kết quả bóng đá trực tuyến, thu hút hàng nghìn người tham gia hàng ngày.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — tổ chức đánh bạc dưới mọi hình thức qua mạng Internet là hành vi bị pháp luật nghiêm cấm.",
        hint: "Chú ý: bản chất hoạt động kinh doanh"
      },
      {
        id: "c2_8",
        title: "Tình huống 8",
        description: "Kẻ xấu dùng phần mềm đánh cắp mật khẩu để chiếm đoạt tài khoản Facebook của nạn nhân, sau đó nhắn tin đòi tiền mới trả lại.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Dùng phần mềm chiếm đoạt tài khoản là TẤN CÔNG MẠNG; hành vi tống tiền sau đó cấu thành TỘI PHẠM MẠNG theo Bộ luật Hình sự.",
        hint: "Có 2 hành vi riêng biệt — xâm nhập và tống tiền"
      },
      {
        id: "c2_9",
        title: "Tình huống 9",
        description: "Ransomware xâm nhập máy tính cá nhân của giám đốc tài chính công ty, mã hóa toàn bộ file và đòi tiền chuộc bằng tiền điện tử.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Xâm nhập trái phép mã hóa dữ liệu là TẤN CÔNG MẠNG, đồng thời hành vi đòi tiền chuộc là TỘI PHẠM MẠNG hình sự.",
        hint: "Vừa có yếu tố tấn công kỹ thuật, vừa có yếu tố tống tiền"
      },
      {
        id: "c2_10",
        title: "Tình huống 10",
        description: "Một cuộc tấn công DDoS quy mô lớn nhắm vào trang web tuyển sinh của trường đại học vào ngày đăng ký nguyện vọng, gây nghẽn mạng.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — DDoS làm quá tải tài nguyên mạng, ngăn cản người dùng truy cập hợp pháp.",
        hint: "Làm nghẽn mạng, gây sập dịch vụ bằng cách gửi lượng request khổng lồ"
      },
      {
        id: "c2_11",
        title: "Tình huống 11",
        description: "Kẻ gian phát tán các tin nhắn giả mạo thương hiệu ngân hàng qua SMS Brandname để lừa đảo người dùng cung cấp mã OTP rút tiền.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — lừa đảo chiếm đoạt tài sản của người dân sử dụng công nghệ viễn thông và Internet.",
        hint: "Mục tiêu trực tiếp là lừa đảo chiếm đoạt tài sản cá nhân"
      },
      {
        id: "c2_12",
        title: "Tình huống 12",
        description: "Đối tượng sử dụng trạm phát sóng giả (IMSI Catcher) can thiệp vào tần số di động để gửi tin nhắn rác lừa đảo đến người dùng xung quanh.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Can thiệp hạ tầng tần số viễn thông trái pháp luật là TẤN CÔNG MẠNG, kết hợp gửi tin nhắn lừa đảo là TỘI PHẠM MẠNG.",
        hint: "Can thiệp hạ tầng phần cứng và phát tán nội dung lừa đảo"
      },
      {
        id: "c2_13",
        title: "Tình huống 13",
        description: "Tin tặc quét và phát hiện lỗi cấu hình sai trên Cloud Storage của một tập đoàn, từ đó tải về hơn 100GB dữ liệu mật của khách hàng.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — khai thác lỗ hổng cấu hình sai để truy cập trái phép và đánh cắp dữ liệu của hệ thống thông tin.",
        hint: "Khai thác cấu hình sai để đột nhập và lấy dữ liệu trái phép"
      },
      {
        id: "c2_14",
        title: "Tình huống 14",
        description: "Một tài khoản Facebook ảo liên tục chia sẻ thông tin thất thiệt, bôi nhọ và xúc phạm nghiêm trọng uy tín của một doanh nghiệp trong nước.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG/VI PHẠM MẠNG — lợi dụng không gian mạng để vu khống, bôi nhọ danh dự, nhân phẩm của tổ chức, cá nhân.",
        hint: "Hành vi xúc phạm danh dự nhân phẩm trực tuyến cấu thành tội phạm hình sự"
      },
      {
        id: "c2_15",
        title: "Tình huống 15",
        description: "Hacker chèn phần mềm gián điệp đánh cắp mật khẩu (Spyware) vào tệp tin crack của game phổ biến rồi chia sẻ lên các diễn đàn mạng.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — phát tán mã độc gián điệp thông qua tệp tin cài đặt giả mạo để xâm nhập máy tính người dùng.",
        hint: "Phát tán mã độc qua phần mềm crack để chiếm quyền hoặc lấy thông tin"
      },
      {
        id: "c2_16",
        title: "Tình huống 16",
        description: "Một nhóm đối tượng phát triển và rao bán rộng rãi bộ công cụ điều khiển máy tính từ xa trái phép (RAT) trên các nhóm kín Telegram.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — sản xuất, mua bán, trao đổi công cụ, thiết bị, phần mềm để sử dụng vào mục đích tấn công mạng trái pháp luật.",
        hint: "Mua bán, cung cấp công cụ hack nguy hiểm cho người khác"
      },
      {
        id: "c2_17",
        title: "Tình huống 17",
        description: "Hacker dò quét mật khẩu yếu, chiếm quyền điều khiển hàng loạt camera giám sát hộ gia đình rồi bán tài khoản truy cập trên Telegram.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Chiếm quyền camera là TẤN CÔNG MẠNG (xâm nhập trái phép), bán quyền truy cập xâm phạm đời tư là TỘI PHẠM MẠNG.",
        hint: "Xâm nhập hệ thống thiết bị IoT và rao bán thông tin đời tư trái phép"
      },
      {
        id: "c2_18",
        title: "Tình huống 18",
        description: "Tin tặc lừa đảo quản trị viên Fanpage của một công ty cài đặt tiện ích mở rộng (extension) Chrome độc hại để cướp quyền kiểm soát trang.",
        correct: "attack",
        explanation: "Đây là TẤN CÔNG MẠNG — sử dụng mã độc extension để vượt qua hàng rào bảo mật và chiếm đoạt phiên đăng nhập của người dùng.",
        hint: "Cướp quyền kiểm soát tài khoản quản trị bằng mã độc"
      },
      {
        id: "c2_19",
        title: "Tình huống 19",
        description: "Đường dây đánh bạc trực tuyến thông qua ứng dụng giả lập casino có máy chủ đặt tại nước ngoài, giao dịch tiền tỷ qua ví điện tử.",
        correct: "crime",
        explanation: "Đây là TỘI PHẠM MẠNG — tổ chức đánh bạc trái phép quy mô lớn sử dụng phương tiện công nghệ và mạng Internet.",
        hint: "Hành vi tổ chức đánh bạc qua mạng"
      },
      {
        id: "c2_20",
        title: "Tình huống 20",
        description: "Đối tượng cố ý rải nhiều thẻ nhớ, USB chứa mã độc trojan tại bãi xe công ty để dụ dỗ nhân viên cắm thử vào máy tính nội bộ.",
        correct: "both",
        explanation: "ĐÂY LÀ CẢ HAI: Sử dụng thiết bị lưu trữ vật lý nhiễm mã độc để tấn công hệ thống là TẤN CÔNG MẠNG, đồng thời là hành vi phá hoại trái pháp luật.",
        hint: "Tấn công kỹ thuật thông qua tiếp cận vật lý (USB baiting)"
      }
    ]
  },

  // ─── CHƯƠNG 3: Vùng cấm (Papers Please style) ──────────────────────────────
  chapter3: {
    intro: "Các case xuất hiện liên tục. Đọc nhanh, phán quyết đúng. Mỗi case có 8 giây.",
    cases: [
      {
        id: "c3_1",
        caseNumber: "CASE-0031",
        severity: "HIGH",
        difficulty: "hard",
        title: "Cuộc gọi deepfake CEO",
        description: "Nhân viên kế toán báo cáo nhận cuộc gọi video từ 'CEO' yêu cầu chuyển gấp 2 tỷ đồng sang tài khoản lạ. Giọng nói và hình ảnh y hệt CEO thật. Phân tích metadata cho thấy cuộc gọi được tạo bằng AI.",
        source: "Phòng Tài chính — Báo cáo khẩn",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Sử dụng trí tuệ nhân tạo để giả mạo giọng nói, hình ảnh của cá nhân nhằm chiếm đoạt tài sản là hành vi bị nghiêm cấm theo Luật An ninh mạng 2025. Cần chặn ngay và báo cáo cơ quan chức năng."
      },
      {
        id: "c3_2",
        caseNumber: "CASE-0032",
        severity: "HIGH",
        difficulty: "medium",
        title: "Website ngân hàng giả mạo",
        description: "Hệ thống phát hiện domain 'vietcombank-secure-login.com' có giao diện y hệt trang chính thức vietcombank.com.vn. Hàng nghìn lượt truy cập mỗi ngày, nhiều người dùng nhập thông tin đăng nhập.",
        source: "Hệ thống giám sát DNS — Cảnh báo tự động",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Giả mạo trang thông tin điện tử của tổ chức tín dụng nhằm đánh cắp thông tin người dùng là hành vi bị nghiêm cấm. Cần chặn domain và báo cáo ngay cho cơ quan bảo vệ pháp luật."
      },
      {
        id: "c3_3",
        caseNumber: "CASE-0033",
        severity: "MEDIUM",
        difficulty: "easy",
        title: "Ứng dụng cá độ bóng đá",
        description: "Phát hiện ứng dụng nhắn tin riêng tư cho phép đặt cược kết quả các trận bóng đá ngoại hạng Anh. Có hơn 5.000 thành viên, giao dịch qua ví điện tử ẩn danh.",
        source: "Báo cáo người dùng — Phòng Tiếp nhận",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Tổ chức đánh bạc dưới mọi hình thức qua mạng Internet là hành vi bị nghiêm cấm theo Luật An ninh mạng 2025. Báo cáo cơ quan công an để điều tra và xử lý."
      },
      {
        id: "c3_4",
        caseNumber: "CASE-0034",
        severity: "HIGH",
        difficulty: "medium",
        title: "AI tạo tin giả dịch bệnh hàng loạt",
        description: "Tài khoản mạng xã hội dùng công cụ AI tạo 500+ bài viết/ngày về 'dịch bệnh lạ bùng phát' với hình ảnh giả, số liệu bịa đặt. Nội dung lan truyền rộng, gây hoang mang dư luận.",
        source: "Đơn vị giám sát nội dung mạng xã hội",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Sử dụng trí tuệ nhân tạo để tạo và phát tán thông tin sai sự thật, gây hoang mang dư luận là hành vi bị nghiêm cấm trong Luật An ninh mạng 2025."
      },
      {
        id: "c3_5",
        caseNumber: "CASE-0035",
        severity: "LOW",
        difficulty: "hard",
        title: "Bài viết phân tích chính sách",
        description: "Blogger chia sẻ bài phân tích chính sách thuế mới với dữ liệu từ báo cáo chính thức của Bộ Tài chính. Bài có dẫn nguồn đầy đủ, quan điểm phê bình ôn hòa, đúng sự thật.",
        source: "Hệ thống giám sát nội dung — Gắn cờ tự động",
        correct: ["allow"],
        correctLabel: "CHO QUA",
        lawRef: "Quyền tự do ngôn luận — Hiến pháp 2013",
        explanation: "Đây là hoạt động hợp pháp. Góp ý, phê bình chính sách công khai dựa trên thông tin chính xác, có dẫn nguồn là quyền công dân được bảo vệ. Không được nhầm lẫn giữa góp ý hợp pháp và phát tán thông tin sai sự thật."
      },
      {
        id: "c3_6",
        caseNumber: "CASE-0036",
        severity: "MEDIUM",
        difficulty: "medium",
        title: "Hệ thống SIM box gian lận cước",
        description: "Phát hiện thiết bị chứa 200 SIM card tại một căn hộ, kết nối với phần mềm đặc biệt để chuyển cuộc gọi quốc tế thành cuộc gọi nội địa, trốn tránh cước phí viễn thông quốc tế.",
        source: "Phối hợp với nhà mạng — Báo cáo bất thường",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Trộm cắp cước viễn thông quốc tế trên nền Internet (SIM box fraud) là hành vi bị nghiêm cấm theo Luật An ninh mạng 2025. Báo cáo cơ quan chức năng để xử lý."
      },
      {
        id: "c3_7",
        caseNumber: "CASE-0037",
        severity: "LOW",
        difficulty: "easy",
        title: "Trang chia sẻ phim lậu",
        description: "Website phimhay-hd.cc cung cấp hàng nghìn bộ phim bản quyền Hollywood, K-drama miễn phí, không có giấy phép phân phối. Lượng truy cập 2 triệu lượt/tháng.",
        source: "Khiếu nại từ đơn vị phân phối nội dung",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Vi phạm bản quyền và sở hữu trí tuệ trên không gian mạng là hành vi bị nghiêm cấm. Báo cáo cơ quan quản lý để xử lý theo pháp luật về sở hữu trí tuệ và an ninh mạng."
      },
      {
        id: "c3_8",
        caseNumber: "CASE-0038",
        severity: "HIGH",
        difficulty: "medium",
        title: "Email phishing nội bộ",
        description: "Phát hiện chiến dịch email giả mạo địa chỉ hr@company.com.vn, yêu cầu toàn bộ nhân viên 'xác minh tài khoản' qua link lạ trỏ đến server ở nước ngoài. Đã có 47 nhân viên nhấp vào link.",
        source: "Hệ thống email gateway — Cảnh báo tự động",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Hành vi phishing — giả mạo địa chỉ email, đánh lừa nhân viên để đánh cắp thông tin đăng nhập — là hành vi nhằm chiếm đoạt thông tin trái phép, bị nghiêm cấm theo Luật An ninh mạng 2025."
      },
      {
        id: "c3_9",
        caseNumber: "CASE-0039",
        severity: "HIGH",
        difficulty: "hard",
        title: "Deepfake bôi nhọ lãnh đạo",
        description: "Video lan truyền rộng trên mạng xã hội ghép mặt Tổng Giám đốc công ty vào cảnh nhạy cảm. Phân tích kỹ thuật xác nhận đây là video deepfake. Uy tín công ty đang bị ảnh hưởng nghiêm trọng.",
        source: "Phòng PR — Yêu cầu xử lý khẩn",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Sử dụng công nghệ để ghép mặt, giả mạo hình ảnh cá nhân trong nội dung xúc phạm danh dự, nhân phẩm là hành vi bị nghiêm cấm. Cần yêu cầu gỡ nội dung và báo cáo cơ quan chức năng."
      },
      {
        id: "c3_10",
        caseNumber: "CASE-0040",
        severity: "LOW",
        difficulty: "hard",
        title: "Báo cáo lỗ hổng bảo mật nội bộ",
        description: "Kỹ sư bảo mật nội bộ Nguyễn Văn A gửi email có mã hóa đến đội CSIRT của công ty, đính kèm báo cáo chi tiết về lỗ hổng SQL injection nghiêm trọng trong hệ thống thanh toán. Đề xuất phương án vá lỗi.",
        source: "Hộp thư bảo mật nội bộ security@company.com.vn",
        correct: ["allow"],
        correctLabel: "CHO QUA",
        lawRef: "Quy trình Responsible Disclosure nội bộ",
        explanation: "Nhân viên báo cáo lỗ hổng bảo mật cho đội an toàn thông tin nội bộ là hành vi hợp pháp và được khuyến khích mạnh mẽ. Đây là 'responsible disclosure' — quy trình chuẩn mực bảo mật. Không được nhầm với hành vi khai thác lỗ hổng."
      },
      {
        id: "c3_11",
        caseNumber: "CASE-0041",
        severity: "HIGH",
        difficulty: "hard",
        title: "Tổ chức hội nhóm xúc phạm cá nhân trên mạng xã hội",
        description: "Phát hiện một nhóm kín trên Facebook với 50.000 thành viên liên tục đăng tải hình ảnh cắt ghép, thông tin bịa đặt vu khống, xúc phạm nghiêm trọng danh dự của một nữ sinh, dẫn đến nạn nhân có hành vi tự hại.",
        source: "Đơn tố cáo từ gia đình nạn nhân",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 18, Luật ANM 2025",
        explanation: "Hành vi xúc phạm danh dự, nhân phẩm, vu khống cá nhân trên không gian mạng là vi phạm nghiêm trọng Luật An ninh mạng 2025. Cần yêu cầu chặn gỡ nội dung ngay lập tức và báo cáo cơ quan công an để xử lý hình sự."
      },
      {
        id: "c3_12",
        caseNumber: "CASE-0042",
        severity: "CRITICAL",
        difficulty: "medium",
        title: "Quảng cáo dụ dỗ đầu tư giả mạo cơ quan nhà nước",
        description: "Hàng loạt website có tên miền dạng chungkhoanviet-vn.com đăng tải banner giả mạo logo của Ủy ban Chứng khoán Nhà nước để dụ dỗ người dân nạp tiền vào app đầu tư lãi suất 30%/tháng, sau đó khóa tài khoản chiếm đoạt tiền.",
        source: "Hệ thống Cảnh báo An toàn thông tin Quốc gia",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Hành vi lừa đảo chiếm đoạt tài sản qua mạng, giả mạo cơ quan nhà nước là vi phạm nghiêm trọng Luật An ninh mạng 2025. Cần khẩn cấp chặn truy cập tên miền giả mạo và chuyển hồ sơ sang cơ quan công an điều tra."
      },
      {
        id: "c3_13",
        caseNumber: "CASE-0043",
        severity: "LOW",
        difficulty: "hard",
        title: "Chia sẻ bài viết phản biện khoa học",
        description: "Một giáo sư đầu ngành chia sẻ bài nghiên cứu khoa học phản biện về hiệu quả của một loại vắc-xin mới được cấp phép, có dẫn chứng dữ liệu lâm sàng từ Tổ chức Y tế Thế giới (WHO). Bài viết thu hút hàng nghìn tranh luận khoa học trái chiều.",
        source: "Hệ thống lọc tự động của mạng xã hội gắn cờ",
        correct: ["allow"],
        correctLabel: "CHO QUA",
        lawRef: "Quyền tự do học thuật và ngôn luận",
        explanation: "Bài phản biện học thuật dựa trên dữ liệu khoa học thực tế và nguồn uy tín là hoàn toàn hợp pháp. Không thể coi đây là thông tin sai sự thật hay tin giả gây hoang mang dư luận. Cần cho qua và khuyến khích thảo luận khoa học lành mạnh."
      },
      {
        id: "c3_14",
        caseNumber: "CASE-0044",
        severity: "HIGH",
        difficulty: "easy",
        title: "Email lừa đảo VinFast trúng thưởng",
        description: "Người dùng báo cáo nhận được email từ địa chỉ 'vinfast-rewards@gmail.com' thông báo trúng thưởng xe điện VF8 và yêu cầu nộp 20 triệu đồng tiền thuế trước bạ qua tài khoản cá nhân để nhận xe.",
        source: "Báo cáo người dùng — Phòng Tiếp nhận",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Hành vi giả mạo thương hiệu lớn và lừa đảo chiếm đoạt tài sản qua email là vi phạm pháp luật. Cần chặn email/địa chỉ gửi và báo cáo cơ quan công an để phối hợp xử lý."
      },
      {
        id: "c3_15",
        caseNumber: "CASE-0045",
        severity: "LOW",
        difficulty: "medium",
        title: "Báo cáo giá cả thị trường nông sản",
        description: "Một website tin tức nông nghiệp đăng tải bài viết tổng hợp giá heo hơi và tiêu dùng tại các chợ đầu mối miền Tây. Số liệu lấy từ báo cáo hàng ngày của Sở Công Thương địa phương.",
        source: "Hệ thống quét tin tức tự động",
        correct: ["allow"],
        correctLabel: "CHO QUA",
        lawRef: "Quyền thông tin và kinh doanh hợp pháp",
        explanation: "Cung cấp thông tin giá cả thị trường trung thực, chính xác và có nguồn gốc rõ ràng là hoạt động bình thường, phục vụ phát triển kinh tế xã hội và quyền thông tin của người dân."
      },
      {
        id: "c3_16",
        caseNumber: "CASE-0046",
        severity: "HIGH",
        difficulty: "hard",
        title: "Script đào coin Monero trên máy chủ",
        description: "Hệ thống giám sát phát hiện một máy chủ ứng dụng bị quá tải 100% CPU do một tiến trình lạ chạy ngầm. Phân tích file log cho thấy đây là script tự động khai thác tiền mã hóa Monero (cryptojacking).",
        source: "Hệ thống giám sát tài nguyên SOC",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 18, Luật ANM 2025",
        explanation: "Sử dụng trái phép tài nguyên hệ thống thông tin của người khác để đào tiền ảo là hành vi tấn công mạng và vi phạm pháp luật. Cần chặn tiến trình độc hại và báo cáo sự cố để điều tra nguồn gốc xâm nhập."
      },
      {
        id: "c3_17",
        caseNumber: "CASE-0047",
        severity: "HIGH",
        difficulty: "medium",
        title: "Tin đồn thất thiệt Ngân hàng phá sản",
        description: "Một nhóm tài khoản mạng xã hội liên tục bình luận, chia sẻ thông tin thất thiệt rằng một ngân hàng thương mại cổ phần lớn chuẩn bị tuyên bố phá sản, kêu gọi người dân đi rút tiền gấp.",
        source: "Hệ thống rà quét mạng xã hội",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 18, Luật ANM 2025",
        explanation: "Phát tán thông tin sai sự thật xâm phạm trật tự quản lý kinh tế, gây hoang mang dư luận và ảnh hưởng đến an ninh tài chính quốc gia là hành vi bị cấm. Cần chặn thông tin và báo cáo cơ quan công an."
      },
      {
        id: "c3_18",
        caseNumber: "CASE-0048",
        severity: "LOW",
        difficulty: "easy",
        title: "Giới thiệu ứng dụng VPN an toàn",
        description: "Bài đăng trên blog công nghệ phân tích ưu/nhược điểm của một số dịch vụ mạng riêng ảo (VPN) uy tín thế giới nhằm giúp người dùng bảo vệ dữ liệu cá nhân khi kết nối Wi-Fi công cộng.",
        source: "Hệ thống lọc từ khóa bảo mật",
        correct: ["allow"],
        correctLabel: "CHO QUA",
        lawRef: "Quyền bảo vệ an toàn thông tin cá nhân",
        explanation: "Giới thiệu, hướng dẫn sử dụng công cụ bảo mật hợp pháp để tự bảo vệ an toàn thông tin cá nhân trên mạng là hành vi bình thường và được khuyến khích."
      },
      {
        id: "c3_19",
        caseNumber: "CASE-0049",
        severity: "CRITICAL",
        difficulty: "hard",
        title: "Tống tiền lộ mã nguồn ví điện tử",
        description: "Một email từ nhóm tin tặc gửi tới Ban Giám đốc kèm bằng chứng đã tải toàn bộ mã nguồn ví điện tử của công ty. Chúng đe dọa sẽ công khai mã nguồn lên Github nếu không nhận được 100.000 USD.",
        source: "Hộp thư Ban Giám đốc — Khẩn",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, 17 & 18, Luật ANM 2025",
        explanation: "Hành vi xâm nhập hệ thống, đánh cắp bí mật công nghệ và tống tiền là vi phạm pháp luật hình sự và an ninh mạng cực kỳ nghiêm trọng. Cần chặn các kết nối của tin tặc và báo cáo khẩn cấp cơ quan chức năng để phối hợp điều tra."
      },
      {
        id: "c3_20",
        caseNumber: "CASE-0050",
        severity: "HIGH",
        difficulty: "medium",
        title: "Kêu gọi ủng hộ thiên tai giả mạo",
        description: "Một trang cá nhân giả danh hội chữ thập đỏ địa phương đăng bài viết kêu gọi cộng đồng chuyển khoản quyên góp ủng hộ đồng bào bị lũ lụt, kèm theo số tài khoản ngân hàng cá nhân.",
        source: "Đơn phản ánh từ cộng đồng mạng",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Giả mạo tổ chức từ thiện để lừa đảo quyên góp tiền là hành vi bị nghiêm cấm theo Luật An ninh mạng 2025. Cần chặn trang giả mạo và chuyển thông tin cho cơ quan điều tra."
      },
      {
        id: "c3_21",
        caseNumber: "CASE-0051",
        severity: "HIGH",
        difficulty: "easy",
        title: "Giả danh cơ quan Thuế đòi truy thu",
        description: "Người dùng báo cáo nhận cuộc gọi giả danh cán bộ Tổng cục Thuế yêu cầu tải ứng dụng 'gdt-gov.apk' từ link lạ để được giảm thuế thu nhập cá nhân. Ứng dụng yêu cầu quyền trợ năng (Accessibility Service).",
        source: "Đơn phản ánh từ người dân",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Hành vi giả mạo cơ quan Thuế phát tán ứng dụng độc hại nhằm chiếm quyền điều khiển điện thoại và rút tiền ngân hàng là tội phạm an ninh mạng nghiêm trọng. Cần chặn link và báo cáo khẩn cấp cơ quan điều tra."
      },
      {
        id: "c3_22",
        caseNumber: "CASE-0052",
        severity: "MEDIUM",
        difficulty: "medium",
        title: "Website đào coin ẩn",
        description: "Phát hiện một trang tin tức bóng đá lén lút chèn mã độc JavaScript CoinHive tự động tận dụng CPU của khách truy cập để đào coin mà không có sự thông báo hay đồng ý của họ.",
        source: "Cảnh báo từ trình duyệt người dùng",
        correct: ["block"],
        correctLabel: "CHẶN",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Sử dụng trái phép thiết bị và tài nguyên của người dùng vào hoạt động khai thác tài sản số là vi phạm luật an ninh thông tin. Cần chặn hoạt động của trang web độc hại."
      },
      {
        id: "c3_23",
        caseNumber: "CASE-0053",
        severity: "HIGH",
        difficulty: "hard",
        title: "Mua bán thông tin cá nhân khách hàng",
        description: "Hệ thống phát hiện một nhân viên chăm sóc khách hàng xuất hơn 10.000 thông tin số điện thoại, địa chỉ và lịch sử mua sắm của khách hàng ra USB, nghi ngờ để bán cho bên bất động sản.",
        source: "Hệ thống DLP giám sát dữ liệu",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Nghị định 13/2023/NĐ-CP",
        explanation: "Tự ý chuyển giao, mua bán dữ liệu cá nhân của khách hàng mà không được sự đồng ý là vi phạm pháp luật nghiêm trọng về bảo vệ dữ liệu cá nhân. Cần lập biên bản báo cáo để xử lý hình sự/hành chính."
      },
      {
        id: "c3_24",
        caseNumber: "CASE-0054",
        severity: "HIGH",
        difficulty: "medium",
        title: "Tin đồn ác ý ngân hàng mất khả năng thanh toán",
        description: "Phát hiện các bài viết giật gân đăng trên nhóm Facebook có 100.000 thành viên, bịa đặt thông tin Ngân hàng X mất khả năng thanh toán và khuyên mọi người đi rút tiền ngay lập tức.",
        source: "Phòng Truyền thông cảnh báo",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Lan truyền thông tin bịa đặt, sai sự thật gây hoang mang dư luận, ảnh hưởng nghiêm trọng đến an ninh tiền tệ quốc gia là hành vi bị cấm. Cần chặn thông tin sai sự thật và báo cáo cơ quan công an."
      },
      {
        id: "c3_25",
        caseNumber: "CASE-0055",
        severity: "MEDIUM",
        difficulty: "medium",
        title: "Quét cổng hàng loạt dải IP Điện lực",
        description: "Hệ thống Firewall ghi nhận đợt quét cổng (Port Scanning) quy mô lớn nhắm vào toàn bộ dải IP công cộng thuộc quyền quản lý của Tập đoàn Điện lực Việt Nam từ nhiều dải IP lạ.",
        source: "IDS/IPS Gateway Điện lực",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Hành vi dò quét hệ thống mạng để tìm kiếm lỗ hổng của cơ sở hạ tầng trọng yếu quốc gia là bước đầu của cuộc tấn công mạng. Cần lập tức chặn IP nguồn và báo cáo khẩn cấp cơ quan chuyên trách."
      },
      {
        id: "c3_26",
        caseNumber: "CASE-0056",
        severity: "HIGH",
        difficulty: "hard",
        title: "Email đính kèm mã độc Sở TNMT",
        description: "Phát hiện email giả mạo Bộ Tài nguyên và Môi trường gửi tới Sở TNMT tỉnh đính kèm tệp tin 'KeHoach2026.docx' chứa mã độc khai thác lỗ hổng Microsoft Word để tải malware về máy.",
        source: "Hệ thống Sandboxing Sandbox-SOC",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 18, Luật ANM 2025",
        explanation: "Đây là hình thức tấn công APT có chủ đích nhắm vào cơ quan quản lý nhà nước thông qua file đính kèm độc hại. Cần chặn email ngay và báo cáo Cục An ninh mạng để điều tra."
      },
      {
        id: "c3_27",
        caseNumber: "CASE-0057",
        severity: "MEDIUM",
        difficulty: "easy",
        title: "Lừa đảo tuyển CTV giật đơn hàng",
        description: "Phát hiện trang web tuyển cộng tác viên online làm nhiệm vụ giật đơn hàng Shopee nhận hoa hồng 20%. Nạn nhân được yêu cầu chuyển tiền cọc vào tài khoản cá nhân, sau đó kẻ gian biến mất.",
        source: "Đường dây nóng phòng ngừa lừa đảo",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Lừa đảo tuyển CTV giật đơn hàng ảo là tội phạm công nghệ phổ biến nhằm chiếm đoạt tài sản. Cần thu thập thông tin tài khoản và báo cáo công an để truy vết dòng tiền lừa đảo."
      },
      {
        id: "c3_28",
        caseNumber: "CASE-0058",
        severity: "MEDIUM",
        difficulty: "medium",
        title: "Ứng dụng cho vay đen truy cập danh bạ trái phép",
        description: "Người dùng khiếu nại ứng dụng vay tiền nhanh 'VaySieuToc' tự ý tải toàn bộ danh bạ điện thoại và album ảnh lên server để thực hiện khủng bố tinh thần người thân khi trễ hạn trả nợ.",
        source: "Báo cáo ứng dụng trên Google Play",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Nghị định 13/2023/NĐ-CP",
        explanation: "Thu thập dữ liệu nhạy cảm (danh bạ, hình ảnh) không đúng mục đích và sử dụng để đe dọa, khủng bố là vi phạm pháp luật dữ liệu cá nhân. Báo cáo cơ quan chức năng để thu hồi giấy phép ứng dụng."
      },
      {
        id: "c3_29",
        caseNumber: "CASE-0059",
        severity: "MEDIUM",
        difficulty: "hard",
        title: "Spam tin nhắn cờ bạc qua SMS Brandname bị hack",
        description: "Hệ thống nhà mạng viễn thông phát hiện tài khoản SMS Brandname của một công ty bán lẻ phát tán hàng triệu tin nhắn quảng cáo trang cá độ trực tuyến trái phép do bị rò rỉ khóa API.",
        source: "Giám sát SMS Gateway nhà mạng",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16, Luật ANM 2025",
        explanation: "Tin tặc lợi dụng API bị rò rỉ để phát tán tin nhắn rác cờ bạc. Cần tạm thời chặn gửi SMS từ Brandname này để ngăn ngừa lừa đảo diện rộng, đồng thời báo cáo chủ quản khắc phục rò rỉ API."
      },
      {
        id: "c3_30",
        caseNumber: "CASE-0060",
        severity: "LOW",
        difficulty: "hard",
        title: "Nhân viên tự ý đẩy mã nguồn công ty lên Github",
        description: "Hệ thống giám sát mã nguồn phát hiện một lập trình viên nội bộ tự ý đăng tải toàn bộ mã nguồn của dự án ERP nội bộ lên kho lưu trữ Github cá nhân dưới chế độ công khai (public).",
        source: "Hệ thống Git-Guardian nội bộ",
        correct: ["block"],
        correctLabel: "CHẶN",
        lawRef: "Quy định bảo mật tài sản trí tuệ doanh nghiệp",
        explanation: "Tự ý đăng tải tài sản trí tuệ và mã nguồn của doanh nghiệp lên mạng công cộng là vi phạm nội quy bảo mật nghiêm trọng. Cần chặn tài khoản, yêu cầu xóa repository ngay lập tức để tránh lộ lọt lỗ hổng bảo mật."
      },
      {
        id: "c3_31",
        caseNumber: "CASE-0061",
        severity: "HIGH",
        difficulty: "easy",
        title: "Giả mạo kêu gọi quyên góp cứu trợ lũ lụt",
        description: "Tài khoản cá nhân tự xưng là đại diện của 'Mặt trận Tổ quốc Việt Nam' viết bài thương tâm kêu gọi quyên góp cho nạn nhân lũ lụt miền Trung, đưa số tài khoản cá nhân để lừa đảo trục lợi.",
        source: "Báo cáo từ mạng xã hội",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Giả mạo cơ quan nhà nước, tổ chức xã hội kêu gọi quyên góp cứu trợ nhằm chiếm đoạt tài sản là hành vi lừa đảo bị pháp luật xử lý nghiêm. Báo cáo cơ quan điều tra để truy cứu trách nhiệm hình sự."
      },
      {
        id: "c3_32",
        caseNumber: "CASE-0062",
        severity: "HIGH",
        difficulty: "medium",
        title: "Camera giám sát phòng họp bị hack livestream",
        description: "Phát hiện hệ thống camera IP của phòng họp Ban Giám đốc bị lộ mật khẩu mặc định, tin tặc đã xâm nhập và phát trực tiếp các nội dung họp chiến lược lên một diễn đàn ngầm.",
        source: "Cảnh báo từ đối tác an ninh mạng",
        correct: ["block", "report"],
        correctLabel: "CHẶN + BÁO CÁO",
        lawRef: "Điều 16 & Điều 18, Luật ANM 2025",
        explanation: "Xâm nhập trái phép thiết bị IoT để đánh cắp bí mật kinh doanh của tổ chức là hành vi tấn công mạng nguy hiểm. Cần chặn ngay kết nối mạng của camera, đổi mật khẩu và báo cáo sự cố để rà soát log."
      },
      {
        id: "c3_33",
        caseNumber: "CASE-0063",
        severity: "HIGH",
        difficulty: "easy",
        title: "Mua bán giấy tờ giả trên Fanpage Facebook",
        description: "Phát hiện trang Fanpage Facebook quảng cáo dịch vụ làm giả Căn cước công dân, Bằng lái xe và Bằng Đại học phôi thật 100%, bảo hành trọn đời, giao hàng toàn quốc ẩn danh.",
        source: "Báo cáo của người dùng",
        correct: ["report"],
        correctLabel: "BÁO CÁO",
        lawRef: "Điều 16 & Điều 17, Luật ANM 2025",
        explanation: "Quảng cáo, giao dịch tài liệu, giấy tờ giả của cơ quan tổ chức qua mạng là tội phạm hình sự. Cần thu thập thông tin số điện thoại, tài khoản của Fanpage này để báo cáo cơ quan công an xử lý."
      }
    ]
  },

  // ─── CHƯƠNG 4: Quản lý đội phản ứng ───────────────────────────────────────
  chapter4: {
    intro: "Đội SOC của bạn có 3 nhân viên. Mỗi lượt có nhiều sự cố, chọn cách xử lý đúng.",
    staff: [
      { id: "s1", name: "Hùng", role: "Phân tích mạng", avatar: "H" },
      { id: "s2", name: "Linh", role: "Phản ứng sự cố", avatar: "L" },
      { id: "s3", name: "Tuấn", role: "Điều tra số", avatar: "T" }
    ],
    rounds: [
      {
        round: 1,
        incidents: [
          {
            id: "r1_i1",
            title: "Phát hiện malware trên máy trạm",
            description: "Phần mềm độc hại được phát hiện trên máy tính kế toán. Hệ thống cách ly tự động đã kích hoạt.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Sự cố phần mềm độc hại mức độ vừa trên một máy đơn lẻ, đội SOC nội bộ xử lý được và đã cách ly. Không cần báo cơ quan bên ngoài.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết ở giai đoạn này. Sự cố đơn lẻ, mức độ vừa, đã được cách ly. Đội nội bộ có đủ năng lực xử lý. Báo ngoài khi sự cố lan rộng hoặc ảnh hưởng hệ thống quan trọng.",
                score: -5
              }
            ]
          },
          {
            id: "r1_i2",
            title: "Người dùng quên đăng xuất",
            description: "Nhân viên báo cáo quên đăng xuất khỏi máy tính tại văn phòng khi về nhà. Không có dấu hiệu truy cập trái phép.",
            priority: "LOW",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Sự cố thông thường, mức độ thấp. Đăng xuất từ xa và nhắc nhở nhân viên là đủ.",
                score: 10
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Không phù hợp. Đây là sự cố nội bộ nhỏ, xử lý nội bộ là đủ.",
                score: -10
              }
            ]
          },
          {
            id: "r1_i3",
            title: "Cắm thiết bị lạ vào máy chủ điều khiển",
            description: "Nhân viên vận hành cắm trực tiếp điện thoại cá nhân vào cổng USB của máy chủ SCADA điều khiển trung tâm để sạc pin.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Hành vi vi phạm chính sách kết nối vật lý nội bộ. Cần ngắt kết nối ngay lập tức, lập biên bản kỷ luật và quét virus máy chủ. Chưa cần báo cơ quan bên ngoài.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết. Đây là vi phạm quy định nội bộ của nhân viên, cần xử lý kỷ luật và cô lập thiết bị trước.",
                score: -5
              }
            ]
          }
        ]
      },
      {
        round: 2,
        incidents: [
          {
            id: "r2_i1",
            title: "Tấn công vào hệ thống điện lực quốc gia",
            description: "Phát hiện mã độc trong hệ thống SCADA điều khiển lưới điện — đây là cơ sở hạ tầng quan trọng quốc gia. Nguy cơ mất điện diện rộng.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "SAI và nguy hiểm! Hệ thống điện lực là cơ sở hạ tầng quan trọng quốc gia. Theo Luật ANM 2025, BẮT BUỘC phải báo cáo ngay Bộ Công an và cơ quan quản lý chuyên ngành. Tự xử lý là vi phạm nghĩa vụ pháp lý.",
                score: -20
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Đây là hệ thống thông tin quan trọng quốc gia. Luật ANM 2025 quy định BẮT BUỘC phải báo cáo ngay cơ quan nhà nước có thẩm quyền khi xảy ra sự cố an ninh mạng ảnh hưởng đến hệ thống này.",
                score: 20
              }
            ]
          },
          {
            id: "r2_i2",
            title: "Nhân viên mở email lạ",
            description: "Nhân viên kinh doanh nhấp vào link trong email không xác định. Hệ thống phát hiện có kết nối ra ngoài đến địa chỉ IP đáng ngờ.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Cách ly máy, quét virus, điều tra log. Sự cố một máy đơn lẻ chưa xác nhận thiệt hại — đội nội bộ xử lý trước, báo cơ quan nếu có dấu hiệu leo thang.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Quá sớm ở giai đoạn này. Xử lý nội bộ trước, sau đó đánh giá mức độ thiệt hại thực tế trước khi báo cáo bên ngoài.",
                score: -5
              }
            ]
          }
        ]
      },
      {
        round: 3,
        incidents: [
          {
            id: "r3_i1",
            title: "Rò rỉ dữ liệu khách hàng quy mô lớn",
            description: "Database khách hàng bị xâm phạm, 500.000 hồ sơ cá nhân có thể đã bị lộ. Nguồn tấn công từ bên ngoài, chưa xác định.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không đủ! Vi phạm dữ liệu quy mô lớn ảnh hưởng đến 500.000 người. Phải báo cáo cơ quan bảo vệ dữ liệu cá nhân, cơ quan an ninh mạng, và thông báo cho người bị ảnh hưởng theo quy định pháp luật.",
                score: -15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Vi phạm dữ liệu quy mô lớn bắt buộc phải báo cáo cơ quan nhà nước có thẩm quyền. Đây vừa là nghĩa vụ pháp lý theo Luật ANM 2025 vừa là trách nhiệm bảo vệ quyền lợi của hàng trăm nghìn người bị ảnh hưởng.",
                score: 20
              }
            ]
          },
          {
            id: "r3_i2",
            title: "Cập nhật phần mềm thất bại",
            description: "Bản cập nhật bảo mật định kỳ thất bại trên 15 máy trạm do lỗi tương thích. Hệ thống vẫn hoạt động bình thường, chưa có nguy cơ bảo mật ngay lập tức.",
            priority: "LOW",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Lỗi cập nhật phần mềm là sự cố kỹ thuật thông thường. Đội IT nội bộ xử lý, không cần báo cơ quan bên ngoài.",
                score: 10
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Không cần thiết. Đây là lỗi kỹ thuật nội bộ thông thường, chưa có nguy cơ bảo mật thực sự.",
                score: -10
              }
            ]
          }
        ]
      },
      {
        round: 4,
        incidents: [
          {
            id: "r4_i1",
            title: "Tấn công hệ thống bệnh viện",
            description: "Ransomware mã hóa toàn bộ hệ thống hồ sơ bệnh án điện tử của bệnh viện tỉnh. Phòng cấp cứu không thể truy cập lịch sử điều trị bệnh nhân.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không đủ! Hệ thống y tế là cơ sở hạ tầng quan trọng — tấn công ảnh hưởng trực tiếp đến tính mạng người bệnh. BẮT BUỘC phải báo cáo ngay Bộ Công an và cơ quan y tế để được hỗ trợ khẩn cấp.",
                score: -20
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Bệnh viện là cơ sở hạ tầng quan trọng, tấn công ảnh hưởng trực tiếp đến an toàn tính mạng. Phải báo cáo ngay và phối hợp với cơ quan chức năng để xử lý khẩn cấp.",
                score: 20
              }
            ]
          },
          {
            id: "r4_i2",
            title: "Tài khoản nhân viên bị xâm phạm",
            description: "Một tài khoản nhân viên văn phòng bị đăng nhập từ IP nước ngoài lúc 3 giờ sáng. Nhân viên xác nhận không phải họ đăng nhập.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Vô hiệu hóa tài khoản ngay, điều tra phạm vi xâm phạm, reset mật khẩu. Sự cố một tài khoản đơn lẻ — xử lý nội bộ trước, leo thang nếu phát hiện thiệt hại lớn hơn.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết ngay. Điều tra và xác định phạm vi thiệt hại trước khi quyết định có cần báo cơ quan bên ngoài.",
                score: -5
              }
            ]
          }
        ]
      },
      {
        round: 5,
        incidents: [
          {
            id: "r5_i1",
            title: "Tấn công vào hệ thống tài chính quốc gia",
            description: "Phát hiện cuộc tấn công tinh vi nhắm vào hệ thống thanh toán liên ngân hàng quốc gia (NAPAS). Nguy cơ gián đoạn toàn bộ hệ thống tài chính.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Tuyệt đối không! NAPAS là hạ tầng tài chính trọng yếu quốc gia. Theo Luật ANM 2025, sự cố này bắt buộc phải báo cáo ngay Bộ Công an, Ngân hàng Nhà nước và các cơ quan liên quan.",
                score: -25
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Chính xác! Hệ thống tài chính quốc gia là cơ sở hạ tầng quan trọng tối cao. Phải kích hoạt ngay quy trình ứng phó khẩn cấp quốc gia và báo cáo tất cả cơ quan có thẩm quyền.",
                score: 25
              }
            ]
          },
          {
            id: "r5_i2",
            title: "Nhân viên mới truy cập dữ liệu nhạy cảm",
            description: "Nhân viên mới được cấp quyền truy cập quá rộng, đã vô tình xem được hồ sơ lương của toàn công ty trong khi tìm file của mình.",
            priority: "LOW",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Đây là sự cố phân quyền nội bộ — rút quyền truy cập thừa, cập nhật chính sách và đào tạo nhân viên. Không cần báo bên ngoài.",
                score: 10
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Không cần thiết. Sự cố phân quyền nội bộ, nhân viên chưa có ý định xấu, xử lý nội bộ là phù hợp.",
                score: -10
              }
            ]
          }
        ]
      },
      {
        round: 6,
        incidents: [
          {
            id: "r6_i1",
            title: "Tấn công chuỗi cung ứng phần mềm",
            description: "Phát hiện phiên bản cập nhật của phần mềm kế toán phổ biến chứa backdoor. Ước tính 10.000 doanh nghiệp Việt Nam đã cài đặt bản bị nhiễm.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không thể tự xử lý! Đây là tấn công chuỗi cung ứng ảnh hưởng đến 10.000 tổ chức. Phải báo cáo ngay Cục An toàn thông tin, Bộ Công an để cảnh báo và hỗ trợ toàn quốc.",
                score: -25
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Tấn công chuỗi cung ứng ảnh hưởng diện rộng bắt buộc phải báo cáo ngay cơ quan an ninh mạng quốc gia. Chỉ có sự phối hợp toàn quốc mới có thể xử lý hiệu quả.",
                score: 25
              }
            ]
          },
          {
            id: "r6_i2",
            title: "Lỗi cấu hình firewall",
            description: "Kiểm tra định kỳ phát hiện firewall biên được cấu hình sai, cho phép một số cổng không cần thiết. Chưa có dấu hiệu bị khai thác.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Lỗi cấu hình chưa bị khai thác — đội kỹ thuật nội bộ vá lỗi ngay. Không cần báo cơ quan bên ngoài ở giai đoạn này.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết. Đây là lỗi cấu hình nội bộ chưa gây thiệt hại. Sửa ngay và ghi nhận vào nhật ký sự cố.",
                score: -5
              }
            ]
          }
        ]
      },
      {
        round: 7,
        incidents: [
          {
            id: "r7_i1",
            title: "Rò rỉ bản vẽ thiết kế dự án cốt lõi",
            description: "Phát hiện tệp tin chứa bản vẽ thiết kế chi tiết sản phẩm chủ lực sắp ra mắt của công ty bị tải lên một diễn đàn chia sẻ công cộng từ IP nội bộ.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Đây là sự cố rò rỉ thông tin nội bộ — cần thu hồi quyền truy cập, yêu cầu diễn đàn gỡ bỏ và điều tra nhân viên phát tán.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết ở giai đoạn đầu. Doanh nghiệp cần tiến hành điều tra nội bộ trước khi yêu cầu cơ quan pháp luật can thiệp về sở hữu trí tuệ.",
                score: -5
              }
            ]
          },
          {
            id: "r7_i2",
            title: "BTS giả hoạt động gần tòa nhà công ty",
            description: "Hệ thống phát hiện sóng ghi nhận một trạm phát sóng giả (IMSI Catcher) đang hoạt động ngay cạnh tòa nhà trụ sở công ty, liên tục gửi tin nhắn rác lừa đảo đến điện thoại nhân viên.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không đủ! BTS giả là thiết bị vô tuyến bất hợp pháp can thiệp sóng viễn thông quốc gia. Bắt buộc phải báo ngay Bộ Công an và Cục Tần số Vô tuyến điện.",
                score: -20
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Trạm BTS giả vi phạm pháp luật nghiêm trọng về tần số vô tuyến điện và an ninh mạng. Cần lập tức thông báo cơ quan chức năng để vây bắt đối tượng.",
                score: 20
              }
            ]
          }
        ]
      },
      {
        round: 8,
        incidents: [
          {
            id: "r8_i1",
            title: "Mã độc ransomware khóa camera tòa nhà",
            description: "Hệ thống lưu trữ dữ liệu camera giám sát an ninh (CCTV) của tòa nhà công ty bị mã hóa hoàn toàn bởi ransomware, đòi tiền chuộc giải mã.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Thực hiện khôi phục hệ thống từ các bản sao lưu (backup) gần nhất và vá lỗ hổng bảo mật của camera. Không trả tiền chuộc cho tin tặc.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết. Sự cố mã hóa camera giám sát nội bộ tự khắc phục bằng backup là giải pháp tối ưu trước.",
                score: -5
              }
            ]
          },
          {
            id: "r8_i2",
            title: "Tấn công chiếm quyền quản lý bay",
            description: "Phát hiện tin tặc chiếm quyền điều khiển hệ thống hiển thị thông tin chuyến bay tại cảng hàng không quốc tế, hiển thị nội dung kích động và xuyên tạc.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không thể tự xử lý! Cảng hàng không là cơ sở hạ tầng thông tin quan trọng quốc gia. Phải kích hoạt khẩn cấp báo cáo Bộ Công an và các cơ quan liên quan ứng phó.",
                score: -25
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Chính xác! Tấn công hạ tầng giao thông hàng không đe dọa trực tiếp an ninh quốc gia và tính mạng hành khách. Phải báo cáo khẩn cấp cơ quan nhà nước chuyên trách.",
                score: 25
              }
            ]
          }
        ]
      },
      {
        round: 9,
        incidents: [
          {
            id: "r9_i1",
            title: "Nhân viên cài đặt VPN không rõ nguồn gốc",
            description: "Phát hiện máy tính làm việc của một nhân viên thiết kế tự ý cài đặt phần mềm VPN lậu miễn phí để vượt tường lửa xem phim giải trí.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Đây là vi phạm chính sách an toàn thông tin nội bộ. Gỡ bỏ phần mềm, thu hồi quyền cài đặt của nhân viên và nhắc nhở nghiêm khắc.",
                score: 10
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Hoàn toàn không cần thiết. Sự cố nhỏ vi phạm nội quy kỹ thuật nội bộ, tự xử lý là phù hợp.",
                score: -10
              }
            ]
          },
          {
            id: "r9_i2",
            title: "Phishing giả mạo Cổng dịch vụ công Quốc gia",
            description: "Phát hiện chiến dịch lừa đảo diện rộng sử dụng tên miền dịch vụ công giả mạo để lừa người dân khai báo thông tin căn cước công dân và tài khoản định danh VNeID.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không đủ! Giả mạo cổng chính phủ để lừa thông tin định danh của người dân cần sự phối hợp của nhà mạng và cơ quan công an để triệt phá domain.",
                score: -15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Cổng dịch vụ công quốc gia bị giả mạo ảnh hưởng uy tín chính phủ và gây thiệt hại lớn cho người dân. Phải báo cáo ngay Cục An toàn thông tin ngăn chặn tên miền.",
                score: 20
              }
            ]
          }
        ]
      },
      {
        round: 10,
        incidents: [
          {
            id: "r10_i1",
            title: "Lỗi rò rỉ bộ nhớ gây tràn RAM máy chủ web",
            description: "Trang thông tin giới thiệu dịch vụ của công ty liên tục bị treo và không truy cập được do lỗi rò rỉ bộ nhớ (memory leak) của ứng dụng web.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Đây là lỗi lập trình kỹ thuật thuần túy, đội ngũ phát triển IT cần debug, tối ưu hóa code và khởi động lại dịch vụ.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Không cần thiết. Lỗi phần mềm kỹ thuật nội bộ chưa có yếu tố tấn công hay lộ lọt dữ liệu.",
                score: -5
              }
            ]
          },
          {
            id: "r10_i2",
            title: "Quét lỗ hổng Zero-day y tế điện tử quốc gia",
            description: "Phát hiện chiến dịch dò quét khai thác lỗ hổng bảo mật Zero-day nhắm vào hệ thống lưu trữ Hồ sơ bệnh án điện tử kết nối liên thông của các bệnh viện lớn.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Tuyệt đối không! Hệ thống y tế kết nối chứa dữ liệu sức khỏe của hàng triệu người dân, việc rò rỉ sẽ gây hậu quả khôn lường. Cần báo cáo ngay để nhận bản vá khẩn cấp.",
                score: -20
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Hệ thống dữ liệu y tế chứa lượng lớn dữ liệu cá nhân nhạy cảm của người dân. Cần báo cáo khẩn cấp Cục An ninh mạng để phối hợp khoanh vùng bảo vệ.",
                score: 20
              }
            ]
          }
        ]
      },
      {
        round: 11,
        incidents: [
          {
            id: "r11_i1",
            title: "Đẩy mã nguồn chứa mật khẩu thô lên Github",
            description: "Một lập trình viên sơ ý đẩy phiên bản mã nguồn của hệ thống quản lý kho chứa thông tin kết nối cơ sở dữ liệu dạng văn bản thô (cleartext password) lên Github công khai.",
            priority: "HIGH",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Thu hồi ngay lập tức khóa truy cập, đổi toàn bộ mật khẩu cơ sở dữ liệu liên quan, xóa vĩnh viễn commit lịch sử trên Github.",
                score: 15
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Chưa cần thiết. Sự cố do sơ suất nội bộ, cần ưu tiên thu hồi thông tin đăng nhập và vá lỗi cấu hình bảo mật nội bộ.",
                score: -5
              }
            ]
          },
          {
            id: "r11_i2",
            title: "Tin tặc tấn công sập hệ thống điều khiển Thủy điện",
            description: "Phát hiện cuộc tấn công APT chiếm quyền điều khiển hệ thống SCADA vận hành cửa xả lũ của một nhà máy thủy điện lớn, đe dọa an toàn vùng hạ lưu.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Không thể tự xử lý! Nhà máy thủy điện là công trình quan trọng liên quan đến an ninh quốc gia. Bắt buộc báo cáo ngay Bộ Công an, Bộ Quốc phòng ứng phó khẩn cấp.",
                score: -25
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Chính xác! Tấn công phá hoại hạ tầng năng lượng trọng yếu quốc gia đe dọa trực tiếp đến tính mạng người dân và an toàn quốc phòng. Phải báo cáo khẩn cấp.",
                score: 25
              }
            ]
          }
        ]
      },
      {
        round: 12,
        incidents: [
          {
            id: "r12_i1",
            title: "Lộ mật khẩu phòng họp trực tuyến nội bộ",
            description: "Một nhân viên chia sẻ công khai ID và mật khẩu phòng họp trực tuyến bàn về định hướng sản phẩm mới của công ty lên group chat công nghệ công cộng.",
            priority: "MEDIUM",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: true,
                explanation: "Đúng! Cần hủy phòng họp hiện tại ngay lập tức, tạo phòng họp mới với mật khẩu mạnh và nhắc nhở kỷ luật nhân viên vi phạm quy tắc bảo mật.",
                score: 10
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: false,
                explanation: "Không cần thiết. Lỗi vi phạm kỷ luật bảo mật nội bộ, doanh nghiệp tự chấn chỉnh và khắc phục phòng họp.",
                score: -10
              }
            ]
          },
          {
            id: "r12_i2",
            title: "Tấn công APT gián điệp vào Bộ Ngoại giao",
            description: "Phát hiện chiến dịch tấn công có tổ chức sử dụng mã độc tinh vi được thiết kế riêng nhằm mục đích thu thập và tình báo dữ liệu từ hệ thống Bộ Ngoại giao.",
            priority: "CRITICAL",
            options: [
              {
                label: "Tự xử lý nội bộ",
                correct: false,
                explanation: "Tuyệt đối không! Đây là hành vi gián điệp quốc tế xâm hại an ninh chính trị quốc gia. Phải báo cáo ngay lập tức cho cơ quan tình báo mạng và Bộ Công an.",
                score: -25
              },
              {
                label: "Báo cáo cơ quan chức năng",
                correct: true,
                explanation: "Đúng! Sự cố an ninh mạng cấp độ quốc gia ảnh hưởng đến chính trị, ngoại giao quốc tế bắt buộc phải chuyển giao cho lực lượng chuyên trách xử lý.",
                score: 25
              }
            ]
          }
        ]
      }
    ]
  },

  // ─── CHƯƠNG 5: Boss Final ───────────────────────────────────────────────────
  chapter5: {
    intro: "GHOST_VN đang tấn công. 90 giây — xử lý tất cả case bạn có thể.",
    duration: 90,
    // Pool ngẫu nhiên từ các chương trước (id reference)
    poolIds: ["c3_1","c3_2","c3_3","c3_4","c3_5","c3_6","c3_7","c3_8","c3_9","c3_10",
              "c2_1","c2_2","c2_3","c2_4","c2_5","c2_6","c2_7","c2_8"]
  },

  // ─── ENDINGS ────────────────────────────────────────────────────────────────
  endings: {
    excellent: {
      grade: "XUẤT SẮC",
      title: "Nhiệm vụ Hoàn Thành — Đề Bạt",
      summary: "Chuyên viên Long đã chứng minh năng lực vượt trội trong nhận diện và xử lý mối đe dọa an ninh mạng. Toàn bộ tấn công của GHOST_VN bị chặn đứng. Long được đề bạt lên Trưởng nhóm SOC.",
      ghost: "GHOST_VN bị truy vết và bắt giữ tại Hà Nội vào 03:42 sáng.",
      detail: "Hệ thống an toàn hoàn toàn. Không có dữ liệu nào bị rò rỉ. Công ty nhận bằng khen của Cục An toàn thông tin về ứng phó sự cố xuất sắc.",
      color: "#3FA796"
    },
    good: {
      grade: "HOÀN THÀNH",
      title: "Nhiệm vụ Hoàn Thành — Có Lưu Ý",
      summary: "Chuyên viên Long đã hoàn thành nhiệm vụ cơ bản — hệ thống được bảo vệ, GHOST_VN không đạt mục tiêu. Tuy nhiên còn một số quyết định xử lý chưa tối ưu.",
      ghost: "GHOST_VN rút lui nhưng chưa bị bắt giữ — có thể sẽ tấn công lần nữa.",
      detail: "Đội SOC nhận nhắc nhở nội bộ về một số quy trình xử lý. Cần cải thiện thêm để đạt chuẩn theo Luật An ninh mạng 2025.",
      color: "#E8A33D"
    },
    failed: {
      grade: "CẢNH BÁO",
      title: "Nhiệm vụ Thất Bại — Xử Phạt",
      summary: "Các quyết định xử lý sai dẫn đến hậu quả nghiêm trọng. GHOST_VN đã khai thác được các lỗ hổng trong quy trình phản ứng của đội SOC.",
      ghost: "GHOST_VN đã đạt mục tiêu và tẩu thoát. Dữ liệu khách hàng bị rò rỉ trên dark web.",
      detail: "Công ty bị xử phạt hành chính do vi phạm nghĩa vụ báo cáo sự cố an ninh mạng. Long phải tham gia chương trình đào tạo lại về Luật An ninh mạng 2025.",
      color: "#D64550"
    }
  },

  // ─── SKILL TREE ──────────────────────────────────────────────────────────────
  skillTree: [
    {
      id: 'recon',
      color: '#3FA796',
      label: 'TRINH SÁT',
      skills: [
        {
          id: 'owl_eye',
          name: 'Mắt Cú Đêm',
          maxLevel: 3,
          costPerLevel: [15, 25, 40],
          desc: 'Tăng thời gian quan sát mỗi case trong Ch3 và Ch5',
          effectLabels: ['+2s mỗi case', '+4s mỗi case', '+6s mỗi case']
        },
        {
          id: 'quick_analysis',
          name: 'Phân Tích Nhanh',
          maxLevel: 2,
          costPerLevel: [20, 35],
          desc: 'Cơ hội làm nổi từ khóa pháp lý quan trọng trong nội dung case',
          effectLabels: ['30% tự làm nổi từ khóa', '55% tự làm nổi từ khóa']
        },
        {
          id: 'investigation_instinct',
          name: 'Trực Giác Điều Tra',
          maxLevel: 3,
          costPerLevel: [20, 30, 45],
          desc: 'Cơ hội tự loại 1 lựa chọn sai khi gặp case độ khó KHÓ',
          effectLabels: ['15% loại 1 đáp án sai (KHÓ)', '30% loại 1 đáp án sai (KHÓ)', '45% loại 1 đáp án sai (KHÓ)']
        }
      ]
    },
    {
      id: 'defense',
      color: '#E8A33D',
      label: 'PHÒNG THỦ',
      skills: [
        {
          id: 'backup_shield',
          name: 'Khiên Dự Phòng',
          maxLevel: 3,
          costPerLevel: [15, 25, 40],
          desc: 'Tăng HP tối đa của Long',
          effectLabels: ['+10 HP tối đa (110)', '+20 HP tối đa (120)', '+30 HP tối đa (130)']
        },
        {
          id: 'shock_absorption',
          name: 'Hấp Thụ Sốc',
          maxLevel: 2,
          costPerLevel: [20, 35],
          desc: 'Giảm sát thương nhận được khi trả lời sai',
          effectLabels: ['−20% damage nhận', '−35% damage nhận']
        },
        {
          id: 'fast_recovery',
          name: 'Phục Hồi Nhanh',
          maxLevel: 2,
          costPerLevel: [25, 40],
          desc: 'Tự hồi HP khi duy trì chuỗi trả lời đúng',
          effectLabels: ['+3 HP sau mỗi 2 case đúng liên tiếp', '+5 HP sau mỗi 2 case đúng liên tiếp']
        }
      ]
    },
    {
      id: 'combat',
      color: '#D64550',
      label: 'CHIẾN ĐẤU',
      skills: [
        {
          id: 'decisive_strike',
          name: 'Đòn Quyết Đoán',
          maxLevel: 3,
          costPerLevel: [15, 25, 40],
          desc: 'Cơ hội kích hoạt crit ngẫu nhiên khi trả lời đúng',
          effectLabels: ['+5% cơ hội crit bổ sung', '+10% cơ hội crit bổ sung', '+15% cơ hội crit bổ sung']
        },
        {
          id: 'shield_breaker',
          name: 'Phá Khiên Thần Tốc',
          maxLevel: 2,
          costPerLevel: [25, 40],
          desc: 'Giảm độ bền khiên của GHOST_VN trong Ch5',
          effectLabels: ['Khiên boss: 25 HP (từ 30)', 'Khiên boss: 20 HP (từ 30)']
        },
        {
          id: 'battlefield_exp',
          name: 'Kinh Nghiệm Chiến Trường',
          maxLevel: 3,
          costPerLevel: [20, 30, 45],
          desc: 'Tăng hệ số nhân sát thương khi đạt combo',
          effectLabels: ['Combo ×1.65', 'Combo ×1.80', 'Combo ×2.00']
        }
      ]
    }
  ]
};
