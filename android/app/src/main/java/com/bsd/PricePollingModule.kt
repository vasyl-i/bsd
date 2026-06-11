package com.bsd

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import org.json.JSONArray
import java.io.IOException
import java.util.Timer
import java.util.TimerTask
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableArray


class PricePollingModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var timer: Timer? = null
    private val client = OkHttpClient()
    private val apiURL =
        "https://api.binance.com/api/v3/klines?symbol=BTCEUR&interval=15m&limit=96"

    override fun getName(): String = "PricePollingModule"

    @ReactMethod
    fun startPolling(intervalMs: Double) {
        stopPolling()

        val period = intervalMs.toLong()

        timer = Timer().apply {
            schedule(object : TimerTask() {
                override fun run() {
                    fetchPrice()
                }
            }, 0, period)
        }
    }

    @ReactMethod
    fun stopPolling() {
        timer?.cancel()
        timer = null
    }

    private fun fetchPrice() {
        val request = Request.Builder().url(apiURL).build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {}

            override fun onResponse(call: Call, response: Response) {
                val body = response.body?.string() ?: return
                try {
                    val jsonArray = JSONArray(body)
                    val result: WritableArray = Arguments.createArray()

                    for (i in 0 until jsonArray.length()) {
                        val kline = jsonArray.getJSONArray(i)
                        val item: WritableArray = Arguments.createArray()
                        for (j in 0 until kline.length()) {
                            val value = kline.get(j)
                            when (value) {
                                is Number -> item.pushDouble(value.toDouble())
                                is String -> item.pushString(value)
                                else -> item.pushString(value.toString())
                            }
                        }
                        result.pushArray(item)
                    }

                    if (reactApplicationContext.hasActiveCatalystInstance()) {
                        reactApplicationContext
                            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
                            .emit("onPriceUpdate", result)
                    }
                } catch (_: Exception) {}
            }
        })
    }

    @ReactMethod
    fun addListener(eventName: String) {}

    @ReactMethod
    fun removeListeners(count: Int) {}
}
