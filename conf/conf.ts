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
        user: "USER",
        pwd: getPassword("black_bean"),
        writer: 'Ktime.ca',
        debug_board: "BOARD_URL",
        board: "BOARD_URL",
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
                    url: "https://naver.com",
                    text: "https://ktime.com"
                }
            },
            {
                type: "IMAGE_LINK",
                data: {
                    url: "https://daum.net",
                    src: "https://t1.daumcdn.net/cafeattach/1Zk4Q/ffd1d01ad6ade94bfdb6560cffd1beb6cbeb0fb6"
                }
            },

        ]
    },

};