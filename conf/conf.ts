import { ConfigMap } from '../src/types';
import { credentials } from './secrets';

function getPassword(username: keyof typeof credentials): string {
    const password = credentials[username];
    if (password === undefined) {
        // This error will stop the application if a password is missing, which is safer.
        throw new Error(`FATAL: Password for user "${username}" not found in secrets.ts. Please add it.`);
    }
    return password;
}

export const configs: ConfigMap = {
    KTIME: {
        description: "교민업소록 KTIME",
        user: "black_bean",
        pwd: getPassword("black_bean"),
        writer: 'Ktime.ca',
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WB6x",
        board: "https://m.cafe.daum.net/skc67/8eaR",
        title: '✂️.....((((헤어컷 반값 이벤트!)))).....✂️ 남자·여자 커트 모두 50% 할인 💮',
        cron: "0 28 1-23 * * *",
        checkDuplicate: true,
        startNow: true,
        debug: false,

        contents: [
            {
                type: "TEXT",
                data: '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🎉 헤어커트 반값 이벤트 🎉\n' +
                    '대상: 남자컷, 여자컷\n' +
                    '기간: 3월 1일~ 6월 30일\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '\n' +
                    '💇‍♂️💇‍♀️ 예약 방법\n' +
                    '아래 케이타임(Ktime) 사이트에서 간단 회원가입\n' +
                    '원하는 날짜와 시간 지정 후 예약\n' +
                    '로그인 후 시술 가격 바로 확인 가능\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '\n' +
                    '🙆‍♂️🙆‍♀️ 머리할 시간 Ktime~!\n' +
                    '"Time for style, time for Ktime!"\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '👇가격 확인하기/ 예약하기👇'
            },
            {
                type: "LINK",
                data: {
                    url: "https://ktime.ca",
                    text: "https://ktime.ca"
                }
            },
            {
                type: "IMAGE_LINK",
                data: {
                    url: "https://ktime.ca",
                    src: "https://t1.daumcdn.net/cafeattach/1Zk4Q/ffd1d01ad6ade94bfdb6560cffd1beb6cbeb0fb6"
                }
            },

        ]
    },
    SAINT1: {
        description: "SAINT1",
        user: "ava030920",
        pwd: getPassword("ava030920"),
        cron: "0 14 1-23/2 * * *",
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WH2H",
        board: "https://m.cafe.daum.net/skc67/33dV",
        title: '🚇퀸 지하철🚇 다운타운 콘도 룸렌트 $1,400 🌸 TMU· 조지브라운 통학🌸 여성전용',
        checkDuplicate: true,
        debug: false,
        startNow: true,
        contents: [
            {
                type: 'TEXT',
                data: '📍 위치: 89 Church St \n' +
                    '(이튼센터 인근 / Queen Station 도보 3분)\n' +
                    ' \n' +
                    '🌇 예쁜 룸  $1,400 \n' +
                    '- 4월 30일부터 입주가능\n\n' +
                    '📩 문의\n '
            },
            {
                type: 'LINK',
                data: {
                    url: "https://open.kakao.com/o/sWdJvhgi",
                    text: "https://open.kakao.com/o/sWdJvhgi"
                }
            },
            {
                type: 'TEXT',
                data: '(문의시: 성별 / 나이 / 하시는 일/ 입주 희망일/ 거주기간/ 체류 비자 종류)\n' +
                    '\n' +
                    ' \n' +
                    '🏡 큰 빌트인 클로젯과 다양한 가구로 넉넉한 수납공간\n' +
                    '환상적인 뷰/ 천장고 높아 개방감 뛰어남\n' +
                    '집주인과 동거하지 않음\n' +
                    '3인 거주 / 1베쓰 구조\n' +
                    '1년 전 입주한 신축 콘도  \n' +
                    ' \n' +
                    '👩 여성 전용 콘도\n' +
                    '집주인 거주 ❌\n' +
                    '깔끔하고 조용한 분위기\n' +
                    ' \n' +
                    '\n' +
                    '📌 입주 비용 \n' +
                    '💰 계약금 = 마지막 달 렌트비\n' +
                    '🏠 입주 시 = 첫 달 렌트비 + Deposit 300\n' +
                    '✔ 마지막 달 렌트비는 계약금으로 이미 납부됨\n' +
                    '\n' +
                    ' \n' +
                    '🚇 교통\n' +
                    'Queen Station 도보 1분\n' +
                    'TTC 지하철 & 스트리트카 즉시 이용 가능\n' +
                    'King · Union · Financial District 빠른 접근\n' +
                    '\n' +
                    '🎓 통학 · 출퇴근 최적\n' +
                    'TMU(구 라이어슨) 통학 매우 편리\n' +
                    'George Brown College 인접\n' +
                    'Financial District 출퇴근 최적 입지\n' +
                    '\n' +
                    '🛒 생활 인프라\n' +
                    'St. Lawrence Market 도보권\n' +
                    '대형마트, 카페, 레스토랑, 은행, 약국 밀집\n' +
                    '다운타운 생활 인프라 모두 갖춘 위치\n' +
                    '\n' +
                    '🌿 주거 포인트\n' +
                    '초역세권이지만 주거 선호도 높은 지역\n' +
                    '학생 · 워홀 · 직장인 모두 만족도 높은 위치\n' +
                    ' \n' +
                    '🚫 규칙 No pet / No smoking / No guest / no parking\n' +
                    ' \n' +
                    '🏫 주변 학교 / 어학원 어학원: ILSC, SGIC, Kaplan International Languages,\n' +
                    'BICC 대학교: Toronto Metropolitan University (TMU), OCAD University, George Brown College, University of Toronto (U of T)     ( ILSC, SGIC, 카플란 (Kaplan International Languages), BICC 어학원 tmu, OCAD University, George brown,토론토대학, UT, u of T, 티엠유, 조지브라운, 오캐드)'
            },

        ]
    },
    SAINT2: {
        description: "SAINT2",
        user: 'jayzone@kakao.com',
        pwd: getPassword('jayzone@kakao.com'),
        cron: "0 9 1-23/3 * * *",
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WH2H",
        board: "https://m.cafe.daum.net/skc67/33dV",
        title: '⭐queen 지하철⭐ 다운타운 콘도 거실룸 $1,250 ⭐',
        checkDuplicate: true,
        debug: false,
        startNow: true,
        contents: [
            {
                type: 'TEXT',
                data: '📍 위치: Queen Station 도보 3분/ 이튼센터 인근\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '💰 거실룸: $1,250\n' +
                    '\n' +
                    '-목재 가벽 시공 구조\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '💬 문의'
            },
            {
                type: 'LINK',
                data: {
                    url: "https://open.kakao.com/o/sYWyChgi",
                    text: "https://open.kakao.com/o/sYWyChgi"
                }
            },
            {
                type: 'TEXT',
                data: '(입주일 / 거주기간 / 성별 / 나이 / 직업 함께 보내주세요)\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🌸 여성전용 렌트\n' +
                    '조용하고 깔끔한 거주 환경 유지되는 집\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🪑 가구 구성\n' +
                    '🛌 침대\n' +
                    '🪑 책상 & 의자\n' +
                    '📚 칼락스 책장\n' +
                    '👗 2단 행거\n' +
                    '🪞 거울\n' +
                    '🍽 공용 식기\n' +
                    '\n' +
                    '🎒 개인 침구만 가져오면 바로 생활 가능\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🚇 교통\n' +
                    'TTC 지하철 & 스트리트카 바로 이용 가능\n' +
                    'King · Union · Financial District 빠른 이동\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🌿 위치 장점\n' +
                    '✔ 초역세권 입지\n' +
                    '✔ 조용하고 선호도 높은 지역\n' +
                    '✔ 학생 · 직장인 모두 만족도 높은 환경\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🎓 통학 · 출퇴근\n' +
                    'TMU 통학 편리\n' +
                    'George Brown College 인접\n' +
                    'Financial District 근접\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🛒 생활 인프라\n' +
                    'St. Lawrence Market 도보권\n' +
                    '카페 · 레스토랑 · 은행 · 약국 밀집\n' +
                    '다운타운 편의시설 모두 근접\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '📚 어학원\n' +
                    '아이엘에스씨 (ILSC)\n' +
                    '에스지아이씨 (SGIC)\n' +
                    '카플란 어학원 (Kaplan International Languages)\n' +
                    '비아이씨씨 (BICC)\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🎓 대학교 · 컬리지\n' +
                    '토론토 메트로폴리탄 대학교 (TMU)\n' +
                    '오캐드 대학교 (OCAD)\n' +
                    '조지 브라운 컬리지\n' +
                    '토론토 대학교 (U of T)\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '📌 입주 비용 안내\n' +
                    '계약금 = 마지막 달 렌트비\n' +
                    '입주 시 = 첫 달 렌트비 + Deposit $300\n' +
                    '✔ 마지막 달 렌트비는 계약금으로 이미 납부됨\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🛡 Liability $1M 포함 보험 가입 (월 약 $20 예상)\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🚫 규칙\n' +
                    'No pet / No smoking / No guest / No drugs\n' +
                    '\n'
            },
        ]
    },
    WHITFIELD: {
        description: "Whitfield",
        user: 'everyday79@kakao.com',
        pwd: getPassword("everyday79@kakao.com"),
        cron: "0 39 */3 * * *",
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WH2H",
        board: "https://m.cafe.daum.net/skc67/33dV",
        title: '📍King·Union역📍 다운타운 콘도 쎄컨룸 $1550, 거실룸 $1,250 🎯 TMU·George Brown 통학 최고!',
        checkDuplicate: true,
        debug: false,
        startNow: true,
        contents: [
            {
                type: 'TEXT',
                data: '\n' +
                    '📍위치: 180 Front St E \n' +
                    ' \n' +
                    '\n' +
                    '쎄컨룸 $1,550\n' +
                    '거실 Room:  $1,250\n' +
                    ' \n' +
                    '📩 문의'
            },
            {
                type: 'LINK',
                data: {
                    text: "카카오톡 오픈채팅",
                    url: "https://open.kakao.com/o/gL7J4xii"
                }
            },
            {
                type: 'TEXT',
                data: '\n' +
                    '카카오톡 오픈채팅\n' +
                    '*알려주세요: 성별 / 나이 / 하시는 일/ 입주 희망일/ 거주기간/ 체류 비자 종류\n' +
                    ' \n' +
                    '👥 남녀 불문/ 총 3인 거주\n' +
                    ' \n' +
                    '\n' +
                    '🚇 교통 최적\n' +
                    '바로 앞 TTC 스트리트카 정류장 (10분 간격 운행)\n' +
                    'King Station, Union Station, Financial District, Waterfront 접근 매우 편리\n' +
                    '다운타운 어디든 빠른 이동 가능\n' +
                    '\n' +
                    '🛒 생활 인프라\n' +
                    'St. Lawrence Market 도보권\n' +
                    'Loblaws, Metro, No Frills 등 대형마트 인접\n' +
                    '카페, 레스토랑, 베이커리, 편의점 다수 밀집\n' +
                    '은행, 약국, 병원 등 생활 편의시설 풍부\n' +
                    '\n' +
                    '🎓 학교 · 직장 접근성\n' +
                    'George Brown College 바로 앞\n' +
                    'Toronto Metropolitan University(TMU, 구 라이어슨) 통학 가까움\n' +
                    'Financial District 출퇴근 최적\n' +
                    '다운타운 오피스 직장인 출퇴근 최적\n' +
                    '유학생 · 워홀 · 직장인 모두 선호 지역\n' +
                    '\n' +
                    '🌿 주변 환경\n' +
                    'Distillery District 인근으로 산책·문화생활 우수\n' +
                    '다운타운이지만 비교적 조용하고 안정적인 주거 환경\n' +
                    '주거 + 도심 라이프를 동시에 누릴 수 있는 위치\n' +
                    '\n' +
                    '➡️ 다운타운에서 ‘살기 좋은 동네’로 손꼽히는 지역\n' +
                    '➡️ 직장·학교·생활 모두 잡은 입지\n' +
                    ' \n' +
                    '\n' +
                    '📌 입주 비용 요약\n' +
                    '💰 계약금 = 마지막 달 렌트비\n' +
                    '🏠 입주 시 = 첫 달 렌트비 + Deposit $300\n' +
                    '✔ 마지막 달 렌트비는 계약금으로 이미 납부됨\n' +
                    '\n' +
                    ' \n' +
                    '🚫 입주 조건\n' +
                    'No Pet, No Smoking, No Guest, No Parking\n' +
                    ' \n' +
                    ' \n' +
                    '#UT #UofT #토론토대학교 #UniversityofToronto #TMU #라이어슨 #TorontoMetropolitanUniversity #조지브라운 #GeorgeBrown #OCAD #오캐드 #다운타운대학 #토론토유학생 #어학원생 #토론토어학원 #ILAC #아일락 #ILSC #EC #EC어학원 #Hansa #TLG #워홀 #워홀숙소 #워킹홀리데이 #King Station # Union Station #유니온역 #킹역 #단기임대 #장기임대'
            },
        ]
    },
    OPEN_REAL: {
        description: "오픈채팅 부동산",
        user: "time030920",
        pwd: getPassword("time030920"),
        cron: "0 56 1-23/3 * * *",
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WIMG",
        board: "https://m.cafe.daum.net/skc67/36i9",
        title: '💬 집주인들의 희노애락 대화방 💬',
        checkDuplicate: true,
        debug: false,
        startNow: true,
        disabled: true,
        contents: [
            {
                type: 'TEXT',
                data: '\n' +
                    ' \n' +
                    '\n' +
                    '✨ 토론토 집주인 오픈채팅방 ✨\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🏡 방 소개\n' +
                    '캐나다에서 집을 소유하거나 관리하는 집주인들이 모여\n' +
                    '희노애락을 함께 나누고, 실질적인 정보를 공유하는 공간입니다.\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '👇 입장하세요.'
            },
            {
                type: 'LINK',
                data: {
                    url: "https://open.kakao.com/o/gA1NMN7d",
                    text: "https://open.kakao.com/o/gA1NMN7d"
                }
            },

            {
                type: 'TEXT',
                data: '\n' +
                    '👥 함께 나누는 이야기\n' +
                    '\n' +
                    '백야드 텃밭 가꾸는 노하우 공유\n' +
                    '\n' +
                    '셀프 집수리 정보 공유\n' +
                    '세입자 관련 경험담 및 노하우\n' +
                    '렌트 계약, 법률 및 세금 정보\n' +
                    '집 관리(수리, 보험 등) 팁\n' +
                    '집주인으로서의 크고 작은 고민들\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '💬 집주인으로서의 기쁨, 고민, 궁금증을 함께 나누는 따뜻한 커뮤니티!\n' +
                    '편하게 들어오셔서 이야기 나누어요.\n' +
                    '\n'
            },

        ]
    },
    OPEN_LIFE: {
        description: "오픈채팅 생활맘톡",
        user: "woo798@naver.com",
        pwd:getPassword("woo798@naver.com"),
        cron: "0 17 0-23/3 * * *",
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WIMG",
        board: "https://m.cafe.daum.net/skc67/36i9",
        title: '캐나다 생활맘톡 (수다+정보+꿀팁) 정보 나눠요!',
        checkDuplicate: true,
        debug: false,
        startNow: false,
        disabled: true,
        contents: [
            {
                type: 'TEXT',
                data: '\n' +
                    '👩‍👧‍👦💬 육아, 살림, 생활 꿀팁부터 할인정보 공유\n' +
                    '\n' +
                    '            일상수다 오픈채팅방 입니다.\n' +
                    '\n' +
                    '캐나다에 살고 있는 엄마들을 위한 오픈채팅방입니다.\n' +
                    '자녀 고민, 쇼핑 할인정보, 생활 꿀팁, 정부 지원금 정보\n' +
                    '엄마들끼리 편하게 이야기 나누고 서로 도와가며 대화나눠요😊\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '\n' +
                    '📌 이런 분들 환영해요!\n' +
                    '캐나다에서 육아 중인 맘들\n' +
                    '각종 마트/드럭스토어/온라인 할인정보 알고 싶은 분\n' +
                    '정부 혜택이나 실생활 정보 궁금한 분\n' +
                    '엄마들과 수다 떨고 싶은 분!\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '\n' +
                    '❗광고나 홍보는 없이 정보만 공유하는 방이에요.\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '\n' +
                    '👇 타지에서 외로운 맘들끼리 힐링대화 나눠요.'
            },
            {
                type: 'LINK',
                data: {
                    url: "https://open.kakao.com/o/gY620oBh",
                    text: "https://open.kakao.com/o/gY620oBh"
                }
            },


        ]
    },
    MID1: {
        user: 'love030920@kakao.com',
        pwd: getPassword("love030920@kakao.com"),
        description: 'MID1',
        cron: [
            "16 */3 * * *",
        ],
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WKRM",
        board: "https://m.cafe.daum.net/skc67/33dV",
        title: '🌟📍 에글링턴 미드타운 거실룸 렌트 📍🌟 합리적인 가격!',
        checkDuplicate: true,
        debug: false,
        startNow: false,
        contents: [
            {
                type: 'TEXT',
                data: ' \n' +
                    '🛏 룸 타입\n' +
                    '✅ 거실 Room\n' +
                    '🛠️ 일반 임시 파티션X → 목재 가벽 구조\n' +
                    '✔️ 안정감 있고 프라이버시 확보된 공간\n' +
                    ' \n' +
                    '📩 문의'
            },
            {
                type: 'LINK',
                data: {
                    url: 'https://open.kakao.com/o/saRvcigi',
                    text: 'https://open.kakao.com/o/saRvcigi'
                }
            },

            {
                type: 'TEXT',
                data: '🚇 교통\n' +
                    'Eglinton 지하철역 인접\n' +
                    '업타운 · 다운타운 이동 모두 편리한 미드타운 핵심 위치\n' +
                    ' \n' +
                    '📅 3월 31일부터 입주 가능\n' +
                    '🗓 실제 룸 뷰잉 가능 — 방문 원하시면 날짜 문의 주세요\n' +
                    ' \n' +
                    '👩 여성 전용 콘도\n' +
                    '집주인 거주 ❌\n' +
                    '깔끔하고 조용한 분위기\n' +
                    ' \n' +
                    '✨ 구비 가구 & 물품 \n' +
                    '🛌 침대\n' +
                    '🪑 책상 & 의자\n' +
                    '📚 칼락스 책장\n' +
                    '💡 스탠드 조명\n' +
                    '👚 2단 행거\n' +
                    '🛒 트롤리\n' +
                    '🍽 기본 식기 & 전자레인지\n' +
                    '🎒 개인 이불만 가져오시면 바로 생활 가능해요!\n' +
                    ' \n' +
                    '🏋️ 콘도 어메니티\n' +
                    '💪 헬스장\n' +
                    '📖 스터디룸\n' +
                    '😶‍🌫️ 스팀 사우나\n' +
                    ' \n' +
                    '📋 계약 안내\n' +
                    '• 계약금: 마지막 달 렌트비 (1개월치)\n' +
                    '→ 계약금은 마지막 달 렌트비로 적용됩니다.\n' +
                    ' \n' +
                    '• 입주날 납부\n' +
                    '첫 달 렌트비 + Key Deposit $300\n' +
                    '→ 마지막 달 렌트비는 이미 계약금으로 납부됨\n' +
                    '→ Key Deposit은 퇴실 시 키 반환 및 데미지/청소 문제 없으면 반환\n' +
                    '  \n' +
                    '🏠 콘도 구조\n' +
                    '전체 구조: 3 Bedroom · 2 Bathroom\n' +
                    '3인 1 Bathroom 사용\n' +
                    '가구 및 수납공간 충분히 구비\n' +
                    ' \n' +
                    '🛒 생활 인프라 (도보 5분)\n' +
                    'Galleria 갤러리아 한인마트\n' +
                    'Farm Boy / Metro / Loblaws\n' +
                    '홍콩반점 / Dollarama\n' +
                    'Shoppers / Winners / SEPHORA\n' +
                    'LCBO / Cineplex\n' +
                    'TD / Scotia / CIBC / RBC\n' +
                    ' \n' +
                    '🎓 학교 접근성\n' +
                    'University of Toronto (UT)\n' +
                    'Toronto Metropolitan University (TMU, 구 Ryerson)\n' +
                    'George Brown College\n' +
                    'OCAD University\n' +
                    'Hansa Language Centre\n' +
                    'ILSC / TLG / ILAC / EC English\n' +
                    ' \n' +
                    '✨ 워홀 · 유학생 최적 위치 (업타운, 다운타운 접근성 최고)\n' +
                    ' \n' +
                    '🚫 입주 조건\n' +
                    'No Pet / No Smoking / No Guest / No Parking'
            },
        ]
    },
    MID2: {
        user: 'dsma96@naver.com',
        pwd: getPassword('dsma96@naver.com'),
        description: 'MID2',
        cron: [
            "8 */3 * * *"
        ],
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WKRM",
        board: "https://m.cafe.daum.net/skc67/33dV",
        title: '💛 에글링턴 예쁜 세컨룸 렌트 👩 여성전용 🌿 미드타운 핵심 위치 🏡 오랜만에 나온 방',
        checkDuplicate: true,
        debug: false,
        startNow: true,
        contents: [
            {
                type: 'TEXT',
                data: '💛 풀 가구 장착 예쁜 세컨룸\n' +
                    '\n' +
                    '📅 최소 거주기간: 4개월\n' +
                    '👀 룸 뷰잉 가능 (방문 원하시는 날짜 문의 주세요)\n' +
                    '\n' +
                    '📩 문의'
            },
            {
                type: 'LINK',
                data: {
                    url: 'https://open.kakao.com/o/s3lObTii',
                    text: 'https://open.kakao.com/o/s3lObTii'
                }
            },

            {
                type: 'TEXT',
                data: '🚇 **위치 & 교통**\n' +
                    '에글링턴 지하철역 바로 인접\n' +
                    '업타운 · 다운타운 이동 모두 편리한 미드타운 핵심 위치\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '👩 **여성 전용 콘도**\n' +
                    '• 집주인 거주 ❌\n' +
                    '• 조용하고 깔끔한 분위기\n' +
                    '\n' +
                    '🪑 **제공 가구 & 물품**\n' +
                    '침대\n' +
                    '책상 & 의자\n' +
                    '발리 책장\n' +
                    '칼락스 책장\n' +
                    '행거\n' +
                    '거울\n' +
                    '빌트인 클로젯\n' +
                    '\n' +
                    '➡ 개인 이불만 준비하시면 바로 입주 가능\n' +
                    '➡ 수납공간 충분히 구비\n' +
                    '\n' +
                    '🏢 **콘도 어메니티**\n' +
                    '헬스장\n' +
                    '스터디룸\n' +
                    '스팀 사우나\n' +
                    '\n' +
                    '📋 **계약 조건**\n' +
                    '• 계약금: 마지막 달 렌트비 1개월치 (마지막 달 렌트로 적용)\n' +
                    '• 입주일 납부: 첫 달 렌트비 + Key Deposit $300\n' +
                    '• Key Deposit은 퇴실 시 키 반환 및 파손/청소 문제 없을 경우 전액 반환\n' +
                    '\n' +
                    '🏠 **집 구조**\n' +
                    '3 Bedroom · 2 Bathroom\n' +
                    '3인 1 Bathroom \n' +
                    '\n' +
                    '🛒 **도보 5분 생활 인프라**\n' +
                    'Galleria · Farm Boy · Metro · Loblaws\n' +
                    'Shoppers · Winners · Sephora\n' +
                    'Dollarama · LCBO · Cineplex\n' +
                    'TD · Scotia · CIBC · RBC\n' +
                    '홍콩반점 등 다양한 식당\n' +
                    '\n' +
                    '🎓 **학교 접근성 우수**\n' +
                    'U of T\n' +
                    'TMU\n' +
                    'George Brown\n' +
                    'OCAD\n' +
                    'Hansa\n' +
                    'ILSC · ILAC · EC · TLG\n' +
                    '\n' +
                    '✨ 워홀 · 유학생에게 최적 위치\n' +
                    '\n' +
                    '🚫 **입주 조건**\n' +
                    'No Pet / No Smoking / No Guest / No Parking\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    ' '
            },
        ]
    },
    FAKE: {
        user: "jay6636jay@gmail.com",
        pwd: getPassword("jay6636jay@gmail.com"),
        debug_board: "https://m.cafe.daum.net/nothingelsematter/WKRM",
        board: "https://m.cafe.daum.net/skc67/33dV",
        description: "FAKE",
        cron: "0 46 */3 * * *",
        title: '💚 다운타운 마스터룸 $1,750 💚 쎄컨룸$1,550 💚 편리한 교통, 편의시설',
        checkDuplicate: true,
        debug: false,
        startNow: false,
        contents: [
            {
                type: 'TEXT',
                data: '\n' +
                    '위치: St. Lawrence Market king station 인근/ 킹station 이용\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '💲 마스터룸 $1,750\n' +
                    '\n' +
                    '💲 쎄컨룸 $1,550\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '💡 유틸리티 안내\n' +
                    '전기 / 수도 / 인터넷 등 공과금은 총 거주 인원 3명이 1/N로 균등 분담합니다.\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🌿 Tenant Insurance O'
            },
            {
                type: 'LINK',
                data: {
                    url: 'https://open.kakao.com/o/sVqdUmgi',
                    text: 'https://open.kakao.com/o/sVqdUmgi'
                }
            },
            {
                type: 'TEXT',
                data: '👤 문의 시 아래 정보 부탁드립니다\n' +
                    '성별 / 나이 / 직업 또는 학업 / 입주 희망일 / 예상 거주기간 \n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🚊 교통\n' +
                    '건물 바로 인근 TTC 스트리트카 정류장이 있어 이동이 매우 편리하며, King Station·Union Station·파이낸셜 디스트릭트·워터프론트 등 주요 지역 접근성이 뛰어납니다. 다운타운 내 이동이 빠르고 수월합니다.\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🛍 주변 편의시설\n' +
                    'St. Lawrence Market이 도보 거리이며, Loblaws·Metro·No Frills 등 대형 마트가 가까이에 있습니다. 카페, 음식점, 베이커리, 편의점뿐 아니라 은행·약국·병원 등 생활시설도 다양합니다.\n' +
                    '\n' +
                    ' \n' +
                    '\n' +
                    '🎓 학교 & 직장 접근성\n' +
                    'George Brown College, TMU 통학 용이\n' +
                    '다운타운 오피스 및 Financial District 출퇴근 편리\n' +
                    '학생·워홀러·직장인 모두 선호하는 위치입니다.'
            }
        ]
    }
};