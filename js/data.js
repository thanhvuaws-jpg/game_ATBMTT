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
