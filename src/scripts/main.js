/**
 * @author Hyojun <gywns1720@naver.com>
 * @version 0.0.1
 * @file main.js
 */

class Banner {
    constructor(enableBanner) {
        // 사용할 배너 컨테이너
        this.enableBanner = enableBanner;
        // 버튼 카운터
        this.count = 0;
    }

    // 배너 자식 크기
    size() {
        const count = this.enableBanner.children().length;
        return count;
    }
    // 배너 이동
    move() {
        // console.log(this.count);
        this.enableBanner.css(
            "left",
            this.count * -this.enableBanner.children().eq(0).width()
        );
    }

    // 배너 앞 인덱스 반환
    get bnext() {
        ++this.count;

        if (this.count >= this.size()) {
            this.count = 0;
        }

        return this;
    }

    // 배너 뒤 인덱스 반환
    get bback() {
        --this.count;

        if (this.count <= -1) {
            this.count = this.size() - 1;
        }

        return this;
    }
    // 현재 배너 인덱스 반환
    get bpop() {
        return this.count;
    }

    // 인덱스 번호 설정
    set choice(n) {
        if (n >= this.size()) {
            this.count = this.size() - 1;
        } else if (n <= -1) {
            this.count = 0;
        } else {
            this.count = n;
        }
    }
}

$(function () {
    const bannerClassname = ".banner-container";
    const bannerIconname = ".banner-icon-container";
    const bannerArrowname = ".banner-arrow-container";

    const $elem = $(bannerClassname);
    const $bannerIcon = $(bannerIconname).children();
    const $bannerArrow = $(bannerArrowname).children();
    let $banner;

    if (typeof $elem !== undefined) {
        $banner = new Banner($elem);
    } else {
        $banner = new Banner($(bannerClassname));
    }

    // 배너 아이콘 이벤트 설정
    bannerIconSetting($bannerIcon);
    function bannerIconSetting($icon) {
        $icon.click(function () {
            $banner.choice = $(this).index();
            // console.log("INDEX" + $(this).index());
            $icon.removeClass("active");
            $(this).addClass("active");
            $banner.move();
        });
    }
    // 배너 화살표 이벤트 설정
    bannerArrowSetting($bannerArrow);
    function bannerArrowSetting($arrow) {
        $arrow.click(function () {
            if ($(this).index()) {
                $banner.bnext.move();
            } else {
                $banner.bback.move();
            }
        });
    }
});
