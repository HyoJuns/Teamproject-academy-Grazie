/**
 * @author Hyojun <gywns1720@naver.com>
 * @version 0.0.1
 * @file main.js
 */

class BannerManagement {
    //! 생성자
    constructor(enableBannerContainer, enableBannerIcon) {
        this.enableBannerContainer = enableBannerContainer;
        this.enableBannerIcon = enableBannerIcon;
        this.bannerCount = 0;
    }

    //! Setter
    // bannerCount 값을 설정한다.
    set index(_n) {
        if (_n <= -1) {
            this.bannerCount = this.getSize;
        } else {
            this.bannerCount = _n < this.getSize + 1 ? _n : 0;
        }
    }

    //! Getter
    get getContainer() {
        return this.enableBannerContainer;
    }
    get getIcon() {
        return this.enableBannerIcon;
    }
    get getSize() {
        return this.enableBannerContainer.children().length - 1;
    }
    get getCount() {
        return this.bannerCount;
    }
    //! Function
    bannerNext() {
        ++this.bannerCount;

        this.index = this.bannerCount;

        return this;
    }
    bannerBack() {
        --this.bannerCount;

        this.index = this.bannerCount;

        return this;
    }

    // 아이콘 색상 변경
    iconMove() {
        const iconArray = this.enableBannerIcon.children();

        if (typeof iconArray === undefined) {
            iconArray = $(".banner-icon-container").children();
        }

        // 아이콘 모두 active 클래스 삭제
        iconArray.removeClass("active");

        // 해당 아이콘에 active 추가
        iconArray.eq(this.bannerCount).addClass("active");
    }

    // 배너 이동
    bannerMove() {
        this.enableBannerContainer.css(
            "left",
            this.bannerCount *
                -this.enableBannerContainer.children().eq(0).width()
        );
        this.iconMove();
    }
}

$(function () {
    const bannerClassname = ".banner-container";
    const bannerIconname = ".banner-icon-container";
    const bannerArrowname = ".banner-arrow-container";

    const $bannerContainer = $(bannerClassname);
    const $bannerIcon = $(bannerIconname);
    const $bannerArrow = $(bannerArrowname);

    const $banner = new BannerManagement($bannerContainer, $bannerIcon);

    // 아이콘 클릭 이벤트
    $banner.getIcon.children().click(function () {
        $banner.index = $(this).index();
        console.log($(this).index());
        console.log(`Size : ${$banner.getSize}`);
        $banner.iconMove();
        $banner.bannerMove();
    });

    // 화살표 클릭 이벤트
    $bannerArrow.children().click(function () {
        if ($(this).index()) {
            $banner.bannerNext();
        } else {
            $banner.bannerBack();
        }

        $banner.iconMove();
        $banner.bannerMove();
    });
});
