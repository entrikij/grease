import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var ShopifyBuy: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  price: number = 0;
  constructor() { }

  ngOnInit() {

    this.LoadProductInfo('a');

    let self = this;
    var activeItem = '';
    var running = 0;

    $(window).on('resize', function(){
      var screenInfo = getScreenInfo();
      var container_visible = screenInfo.container_visible;
      var container_hidden = screenInfo.container_hidden;
      var size = screenInfo.size;

      console.log(activeItem);
      $(container_visible).removeClass('invisible');

      if(size =='sm'){
        if(activeItem != '') {
          $('.shop-item:not(.shop-item-dest)').css('opacity','0');
          $(container_visible).find('.shop-item-controls').show();
          $(container_visible).find('.shop-item-close').show();
        }
        else{
          $(container_visible).hide(0);
          $(container_visible).find('.shop-item-controls').hide();
          $(container_visible).find('.shop-item-close').hide();
        }
      }
      else if(size == 'lg'){
        $('.shop-item:not(.shop-item-dest)').css('opacity','1');
      }
    });


    function checkBreakpoint(breakpoint){
      return !($('#' + breakpoint + '-check').is(':hidden'));
    }

    function fadeOutProduct(){
      var screenInfo = getScreenInfo();
      var size = screenInfo.size;

      var product = $('.shop-item-lg');
      if(product.length != 0){
        var offset = product.offset();
        var height = product.height();
        var clone = product.clone();

        clone.toggleClass('shop-item-lg').css({
          'position':'fixed',
          'top':offset.top - window.scrollY,
          'left':offset.left,
        }).appendTo('body');

        $('.shop-item-lg').remove();
        clone.fadeOut(500);

        if(size == 'sm'){
          clone.remove();
        }
        else{
          setTimeout(function(){
            clone.remove();
          }, 500);
        }
      }
    }

    function activateProduct(item, visible, hidden, size){
      if(!running){
        running = 1;
        fadeOutProduct();

        activeItem = $(item).attr('itemnum');
        self.LoadProductInfo(activeItem);

        $('body').addClass('shop-item-open');

        var $dest1 = $(visible).find('.shop-item-dest');
        var $dest2 = $(hidden).find('.shop-item-dest');

        $dest1.removeClass('hidden');
        $dest2.removeClass('hidden');

        var offset = $(item).offset();
        var height = $(item).height();
        var clone = $(item).clone();
        var expand_height = '350px';
        var expand_left = '10%';

        var dest_offset = $dest1.offset();
        var dest_width = $dest2.width();

        // $(this).animate({
        //    'opacity':'0'
        // }, 0);

        clone.toggleClass('invisible shop-item').appendTo("body").css({
          'position':'fixed',
          'top':offset.top - window.scrollY,
          'left':offset.left,
          'height':height
          //'transform':'translateX(-50%)'
        }).removeClass('invisible').animate({
          'height':expand_height,
          'top':dest_offset.top - window.scrollY,
          'left':dest_offset.left,
        }, 500, function() {
          clone.addClass('shop-item-clone-final');

          var clone2 = clone.clone();
          var clone3 = clone.clone();
          $dest1.addClass('hidden');
          $dest2.addClass('hidden');

          clone2.css({
            'position': 'relative',
            'top': 'unset',
            'left': 'unset',
            'height': '350px'
          }).addClass('shop-item-lg').attr('id', 'shop-item-lg').appendTo(visible + ' > .shop-item-zone');

          clone3.css({
            'position': 'relative',
            'top': 'unset',
            'left': 'unset',
            'height': '350px'
          }).addClass('shop-item-lg').appendTo(hidden + ' > .shop-item-zone');

          clone.remove();
          running = 0;
        });

        $(visible).removeClass('invisible');
        $(visible).find('.shop-item-controls').fadeIn(500);
        $(visible).find('.shop-item-close').fadeIn(500);

        if(size == 'sm'){
          $('.shop-item:not(.shop-item-dest)').fadeTo(500, 0);
        }
      }
    }

    function getScreenInfo(){
      var container_visible = '';
      var container_hidden = '';
      var size = '';
      if(checkBreakpoint('xs') || checkBreakpoint('sm')){
        container_visible = '#shop-item-expand';
        container_hidden = '#shop-item-expand-desktop';
        size = 'sm';
      }
      else{
        container_visible = '#shop-item-expand-desktop';
        container_hidden = '#shop-item-expand';
        size = 'lg';
      }
      return {
        container_visible: container_visible,
        container_hidden: container_hidden,
        size: size
      }
    }

    $('.shop-item-container').click(function(){
        if(!$(this).hasClass('shop-item-na')){
          var screenInfo = getScreenInfo();
          var container_visible = screenInfo.container_visible;
          var container_hidden = screenInfo.container_hidden;
          var size = screenInfo.size;
          let shopItem = $(this).find('.shop-item');
          activateProduct(shopItem, container_visible, container_hidden, size);
        }
    });


    $('.shop-item-close').click(function(){
      var screenInfo = getScreenInfo();
      var container_visible = screenInfo.container_visible;
      var container_hidden = screenInfo.container_hidden;
      var size = screenInfo.size;

      activeItem = '';

      $('.shop-item:not(.shop-item-dest)').fadeTo(500, 1);
      $(container_visible).find('.shop-item-lg').fadeOut(500);
      $(container_visible).find('.shop-item-controls').fadeOut(500);
      $(container_visible).find('.shop-item-close').fadeOut(500);

      setTimeout(function(){
        $('#shop-item-expand, #shop-item-expand-desktop').addClass('invisible').addClass('hidden');
        $(container_visible).find('.shop-item-lg').remove();
      }, 500);
    });
  }


  LoadProductInfo(activeItemId: string){
    if(activeItemId === 'a'){
      this.price = 25;
      this.ClearOldBtns();
      this.InitializeShopifyItem("soldout");
    }
    if(activeItemId === 'b'){
      this.price = 25;
      this.ClearOldBtns();
      this.InitializeShopifyItem("soldout");
    }
    if(activeItemId === 'c'){
      this.price = 30;
      this.ClearOldBtns();
      this.InitializeShopifyItem("soldout");
    }
    if(activeItemId === 'd'){
      this.price = 45;
      this.ClearOldBtns();
      this.InitializeShopifyItem("soldout");
    }
    if(activeItemId === 'e'){
      this.price = 45;
      this.ClearOldBtns();
      this.InitializeShopifyItem("soldout");
    }

  }

  ClearOldBtns(): void{
    $('#product-component1 iframe').remove();
    $('#product-component2 iframe').remove();
  }
  InitializeShopifyItem(idVal): void{
    if(idVal == "soldout"){
      $('.sold-out').show();
    }
    else{
      $('.sold-out').hide();
      var client = ShopifyBuy.buildClient({
        domain: 'greasemerch.myshopify.com',
        storefrontAccessToken: '270d86d30fc3da6e01619d075834f350',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: [idVal],
          node: document.getElementById('product-component1'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product":{"variantId":"all","width":"240px",
              "contents":{"img":false,"imgWithCarousel":false,"title":false,"variantTitle":false,"price":false,"description":false,"buttonWithQuantity":false,"quantity":false},
              "styles":{
                "product":{"text-align":"center","@media (min-width: 601px)":{"max-width":"calc(25% - 20px)","margin-left":"20px","margin-bottom":"50px"}},
                "button": {
                  "color": "#e0e0e0",
                  "background": "transparent",
                  "border": "1.5px solid #e0e0e0",
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  "font-size": "0.9em",
                  ":hover": {"background-color": "transparent"},
                  ":focus": {
                    "background-color": "transparent",
                    "outline": "0 !important"
                  },
                  "padding": "12px 58px",
                  "width": "100%"
                  //"padding":"10px 24px 10px 24px"
                },
                "options":{
                  "width": "100% !important",  //140  //207
                  "display": "block !important"
                },
                "buttonWrapper":{
                  "text-align": "start"
                }
              },
              "googleFonts": [
                "Quantico"
              ]
            },
            "option":{
              "styles":{
                "option":{
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "wrapper":{
                  "background-color":"transparent",
                  "border-color":"#e0e0e0",
                  "border-width":"1.5px",
                  "text-align-last":"center",
                  "text-align":"center",
                  "vertical-align":"center",
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "select":{
                  "color":"#e0e0e0",
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  "font-size": "0.9em",
                  "margin-left":"-2px",
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  },
                  "padding":"7px 5px 7px 5px",
                },
                "selectIcon":{
                  "fill":"#e0e0e0",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "optionSelected":{
                  "color": "white"
                }
              },
              "googleFonts": [
                "Quantico"
              ]
            },
            "cart":{"contents":{"button":true},
              "styles":{
                "footer":{"background-color":"#fff","border-top":"1px solid black"},
                "button":{
                  "background-color":"transparent",
                  "color": "black",
                  "border": "1px solid black"
                }
              }},
            "toggle":{
              "styles":{
                "toggle":{
                  "background-color": "transparent !important",
                  "color": "#fff"
                },
                "iconPath":{
                  "fill": "#fff"
                },
                "count":{
                  "font-size": "11px",
                  "margin-bottom": "0px"
                }
              }
            },
            "modalProduct":{"contents":{"img":false,"imgWithCarousel":true,"variantTitle":false,"buttonWithQuantity":true,"button":false,"quantity":false},
              "styles":{"product":{"@media (min-width: 601px)":{"max-width":"100%","margin-left":"0px","margin-bottom":"0px"}}}},

            "productSet":{"styles":{"products":{"@media (min-width: 601px)":{"margin-left":"-20px"}}}}},
        });
      });


      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: [idVal],
          node: document.getElementById('product-component2'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product":{"variantId":"all","width":"240px",
              "contents":{"img":false,"imgWithCarousel":false,"title":false,"variantTitle":false,"price":false,"description":false,"buttonWithQuantity":false,"quantity":false},
              "styles":{
                "product":{"text-align":"center","@media (min-width: 601px)":{"max-width":"calc(25% - 20px)","margin-left":"20px","margin-bottom":"50px"}},
                "button": {
                  "color": "#e0e0e0",
                  "background": "transparent",
                  "border": "1.5px solid #e0e0e0",
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  "font-size": "0.9em",
                  ":hover": {"background-color": "transparent"},
                  ":focus": {
                    "background-color": "transparent",
                    "outline": "0 !important"
                  },
                  "padding": "12px 58px",
                  "width": "100%"
                  //"padding":"10px 24px 10px 24px"
                },
                "options":{
                  "width": "100% !important",  //140  //207
                  "display": "block !important"
                },
                "buttonWrapper":{
                  "text-align": "start"
                }
              },
              "googleFonts": [
                "Quantico"
              ]
            },
            "option":{
              "styles":{
                "option":{
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "wrapper":{
                  "background-color":"transparent",
                  "border-color":"#e0e0e0",
                  "border-width":"1.5px",
                  "text-align-last":"center",
                  "text-align":"center",
                  "vertical-align":"center",
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "select":{
                  "color":"#e0e0e0",
                  "font-family": "Quantico, sans-serif",
                  "font-weight": "bold",
                  "font-size": "0.9em",
                  "margin-left":"-2px",
                  "cursor":"pointer",
                  ":focus":{
                    "outline":"0 !important"
                  },
                  "padding":"7px 5px 7px 5px",
                },
                "selectIcon":{
                  "fill":"#e0e0e0",
                  ":focus":{
                    "outline":"0 !important"
                  }
                },
                "optionSelected":{
                  "color": "white"
                }
              },
              "googleFonts": [
                "Quantico"
              ]
            },
            "cart":{"contents":{"button":true},
              "styles":{
                "footer":{"background-color":"#fff","border-top":"1px solid black"},
                "button":{
                  "background-color":"transparent",
                  "color": "black",
                  "border": "1px solid black"
                }
              }},
            "toggle":{
              "styles":{
                "toggle":{
                  "background-color": "transparent !important",
                  "color": "#fff"
                },
                "iconPath":{
                  "fill": "#fff"
                },
                "count":{
                  "font-size": "11px",
                  "margin-bottom": "0px"
                }
              }
            },
            "modalProduct":{"contents":{"img":false,"imgWithCarousel":true,"variantTitle":false,"buttonWithQuantity":true,"button":false,"quantity":false},
              "styles":{"product":{"@media (min-width: 601px)":{"max-width":"100%","margin-left":"0px","margin-bottom":"0px"}}}},

            "productSet":{"styles":{"products":{"@media (min-width: 601px)":{"margin-left":"-20px"}}}}},
        });
      });
    }
  }
}
