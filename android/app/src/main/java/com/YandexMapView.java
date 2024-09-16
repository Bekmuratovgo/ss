package com.taxiclient;

import android.widget.FrameLayout;
import com.yandex.mapkit.MapKitFactory;
import com.yandex.mapkit.mapview.MapView;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class YandexMapView extends SimpleViewManager<FrameLayout> {

    private MapView mapView;

    @Override
    public String getName() {
        return "YandexMapView";
    }

    @Override
    public FrameLayout createViewInstance(ThemedReactContext context) {
        FrameLayout layout = new FrameLayout(context);
        MapKitFactory.setApiKey("68d5aecf-911e-44d1-a833-f50832c1f69a"); // Вставьте ваш API ключ
        mapView = new MapView(context);
        layout.addView(mapView);
        return layout;
    }
}
