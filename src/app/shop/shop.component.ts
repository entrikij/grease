import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var ShopifyBuy: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.shop-item').click(function(){
      $('body').addClass('shop-item-open');

      var $dest = $('#shop-item-dest');

      $dest.removeClass('hidden');

      var offset = $(this).offset();
      var height = $(this).height();
      var clone = $(this).clone();
      var expand_height = '350px';
      var expand_left = '10%';

      var dest_offset = $dest.offset();
      var dest_width = $dest.width();

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
      }, 500, function(){
        clone.addClass('shop-item-clone-final');

        var clone2 = clone.clone();
        $dest.hide();
        clone2.css({
          'position':'relative',
          'top':'unset',
          'left':'unset',
          'height':'350px'
        }).appendTo('#shop-item-zone');

        clone.remove();
        $('#shop-item-expand').removeClass('invisible');
      });


      $('.shop-item:not(#shop-item-dest)').fadeTo(500, 0);
    });
  }


  InitializeShopifyItem(idVal): void{
    if(idVal == "soldout"){
      $('#sold-out').show();
    }
    else{
      $('#sold-out').hide();
      var client = ShopifyBuy.buildClient({
        domain: 'roy-blair.myshopify.com',
        storefrontAccessToken: 'c4436ef009919a87987bc103df1e3fa1',
      });
      ShopifyBuy.UI.onReady(client).then(function (ui) {
        ui.createComponent('product', {
          id: [idVal],
          node: document.getElementById('product-component'),
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            "product":{"variantId":"all","width":"240px",
            "contents":{"img":false,"imgWithCarousel":false,"title":false,"variantTitle":false,"price":false,"description":false,"buttonWithQuantity":false,"quantity":false},
            "styles":{
              "product":{"text-align":"center","@media (min-width: 601px)":{"max-width":"calc(25% - 20px)","margin-left":"20px","margin-bottom":"50px"}},
              "button": {
                "color": "#000",
                "background": "transparent",
                "border": "1px solid #000",
                "font-family": "\"WebsiteFont\", \"Helvetica Neue\", Arial",
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
            }
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
                "border-color":"black",
                "border-width":"1px",
                "text-align-last":"center",
                "text-align":"center",
                "vertical-align":"center",
                "cursor":"pointer",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "select":{
                "color":"black",
                "font-family": "\"Helvetica Neue\", Arial",
                "font-weight": "bold",
                "font-size": "0.9em",
                "margin-left":"-2px",
                "cursor":"pointer",
                ":focus":{
                  "outline":"0 !important"
                },
                "padding":"7px 5px 7px 5px"
              },
              "selectIcon":{
                "fill":"black",
                ":focus":{
                  "outline":"0 !important"
                }
              },
              "optionSelected":{
                "color": "black"
              }
            }
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
                "background-color": "transparent",
                "color": "#000"
              },
              "iconPath":{
                "fill": "#000"
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


  InitializeItemAnimation(): void{
    $('.shop-item').click(function(){
      $('body').addClass('modal-open');

      var offset = $(this).offset();
      var width = $(this).width();
      var clone = $(this).clone();
      var expand_width = '80%';
      var expand_left = '10%';

      // $(this).animate({
      //    'opacity':'0'
      // }, 0);

      clone.toggleClass('invisible').appendTo("body").css({
        'position':'fixed',
        'top':offset.top - window.scrollY,
        'left':offset.left,
        'width':width
        //'transform':'translateX(-50%)'
      }).removeClass('invisible').animate({
        'width':expand_width,
        'height':'50vh',
        'top':'25px',
        'left':expand_left,
        'background-color':'white',
        'box-shadow':'0 0 6px 3px black'
      }, 300, function(){
        clone.addClass('content-item-clone-final');
      });

      $('.overlay').fadeIn(300);
    });
  }
}
