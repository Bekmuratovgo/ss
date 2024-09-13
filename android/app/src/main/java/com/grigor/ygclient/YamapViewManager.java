package com.grigor.ygclient;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;

public class YamapViewManager extends SimpleViewManager<YamapView> {
    public static final String REACT_CLASS = "YamapView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected YamapView createViewInstance(ThemedReactContext reactContext) {
        return new YamapView(reactContext); // Замените на создание вашего YamapView
    }
}
