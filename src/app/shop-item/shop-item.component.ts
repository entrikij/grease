import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
declare var ShopifyBuy: any;

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.css']
})
export class ShopItemComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.InitializeShopifyItem("564217249849");
  }

  InitializeShopifyItem(idVal): void{
    if(idVal == "soldout"){
      $('#sold-out').show();
    }
    else{
      $('#sold-out').hide();
      var client = ShopifyBuy.buildClient({
        domain: 'greasemerch.myshopify.com',
        apiKey: '270d86d30fc3da6e01619d075834f350',
        appId: '6',
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
                "color": "#ff00e7",
                "background": "transparent",
                "border": "1.5px solid #e628b6",
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
                "border-color":"#e628b6",
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
                "color":"#ff00e7",
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
                "fill":"#ff00e7",
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

}
