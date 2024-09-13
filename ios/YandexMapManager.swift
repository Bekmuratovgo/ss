import YandexMapsMobile
@objc(YandexMapView)
class YandexMapView: RCTViewManager {
  override func view() -> UIView! {
    let mapView = YMKMapView()
    YMKMapKit.setApiKey("68d5aecf-911e-44d1-a833-f50832c1f69a") // Вставьте ваш API ключ
    return mapView
  }
}
