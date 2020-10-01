import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

//a(){
//  Colors.white
//}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
        // This makes the visual density adapt to the platform that you run
        // the app on. For desktop platforms, the controls will be smaller and
        // closer together (more dense) than on mobile platforms.
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      // This call to setState tells the Flutter framework that something has
      // changed in this State, which causes it to rerun the build method below
      // so that the display can reflect the updated values. If we changed
      // _counter without calling setState(), then the build method would not be
      // called again, and so nothing would appear to happen.
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[Component(), ],
        ),
      ),
    );
  }
}
class Component extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 414,
      color: Colors.white,
      padding: const EdgeInsets.only(
        bottom: 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 55,
            color: Colors.white,
            padding: const EdgeInsets.only(
              top: 16,
              bottom: 15,
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Text(
                  "Bridged",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 18,
                    fontFamily: "Roboto",
                    fontWeight: FontWeight.w400,
                  ),
                ),
                SizedBox(width: 296),
                Container(
                  width: 24,
                  height: 24,
                  child: Stack(
                    children: [
                      Positioned.fill(
                        child: Align(
                          alignment: Alignment.center,
                          child: Opacity(
                            opacity: 0.50,
                            child: Container(
                              width: 14,
                              height: 14,
                              color: Colors.black,
                            ),
                          ),
                        ),
                      ),
                      Opacity(
                        opacity: 0.50,
                        child: Container(
                          width: 24,
                          height: 24,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 4.86),
          Padding(
            padding: const EdgeInsets.all(4),
            child: Opacity(
              opacity: 0.50,
              child: Container(
                width: 16,
                height: 16,
                color: Colors.black,
              ),
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "visual/red",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24.50),
              color: Color(0xffff3a3a),
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "#FF3A3A",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 66,
            height: 66,
            color: Color(0xffff3a3a),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            color: Color(0xffff6161),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            color: Color(0xffff8d8d),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            color: Color(0xffffb0b0),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            color: Color(0xffffc9c9),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 52,
            height: 52,
            color: Color(0xffffdfdf),
          ),
          SizedBox(height: 4.86),
          Text(
            "OPEN COLOR SYSTEM SETTINGS",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "Colors.red",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "Colors.visual.red",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "CODE",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "#FF3A3A",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "0XFF3A3A",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "USAGE",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "used in 42 components",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "button/error",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "SIMILAR LIBRARY COLORS",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(24.50),
              color: Color(0xffff3a3a),
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "system/error",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "100% match",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 24,
            height: 24,
            child: Stack(
              children: [
                Positioned.fill(
                  child: Align(
                    alignment: Alignment.center,
                    child: Opacity(
                      opacity: 0.50,
                      child: Container(
                        width: 7.41,
                        height: 12,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ),
                Opacity(
                  opacity: 0.50,
                  child: Container(
                    width: 24,
                    height: 24,
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "VIEW ALL COLOR LIBRARY",
            style: TextStyle(
              color: Color(0xff1d1d1d),
              fontSize: 14,
              decoration: TextDecoration.underline,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w500,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "DESCRIPTION",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Text(
            "no description has provided yet.",
            style: TextStyle(
              color: Color(0xff7f7f7f),
              fontSize: 18,
              fontFamily: "Roboto",
              fontWeight: FontWeight.w400,
            ),
          ),
          SizedBox(height: 4.86),
          Container(
            width: 366,
            height: 105,
            color: Color(0xfff2f2f2),
          ),
          SizedBox(height: 4.86),
          Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(4),
              color: Color(0xff131313),
            ),
            padding: const EdgeInsets.only(
              left: 154,
              right: 153,
              top: 22,
              bottom: 24,
            ),
            child: Text(
              "Export",
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.button,
            ),
          ),
        ],
      ),
    );
  }
}
