//
//  DateTimeViewController.swift
//  DateTime
//
//  Created by Craig Francis on 04/03/2017.
//  Copyright © 2017 Craig Francis. All rights reserved.
//

import Cocoa
import WebKit

class DateTimeViewController: NSViewController {
    
    @IBOutlet weak var webView: WebView!

    override func viewDidLoad() {
        
        super.viewDidLoad()

        let index_url = NSURL(fileURLWithPath:Bundle.main.path(forResource: "index", ofType: "html")!)
        let request = NSURLRequest(url: index_url as URL);

        self.webView.frameLoadDelegate = self
        self.webView.drawsBackground = false;
        self.webView.mainFrame.load(request as URLRequest!);

    }

    override var representedObject: Any? {
        didSet {
            // Update the view, if already loaded.
        }
    }

    func windowShown() {
        self.webView.windowScriptObject.evaluateWebScript("dateTime.onShow();");
    }

}

extension DateTimeViewController: WebFrameLoadDelegate {

    func webView(_ webView: WebView!, didClearWindowObject windowObject: WebScriptObject!, for frame: WebFrame!) {
        webView.windowScriptObject.setValue(self, forKey: "DateTimeApp")
    }
    
    override class func webScriptName(for sel: Selector) -> String? {
        if sel == #selector(DateTimeMessage) {
            return "message";
        }
        return nil
    }
    
    override class func isSelectorExcluded(fromWebScript sel: Selector) -> Bool {
        switch (sel) {
        case #selector(DateTimeMessage):
            return false
        default:
            return true
        }
    }

    @objc func DateTimeMessage(message_type: String, message_value: String) -> String {
        
        var php_path = "";
        
        if (message_type == "dateFormat") {
            php_path = Bundle.main.path(forResource: "dateFormat", ofType: "php")!
        } else if (message_type == "dateDiff") {
            php_path = Bundle.main.path(forResource: "dateDiff", ofType: "php")!
        } else {
            return "Invalid type";
        }

        let task = Process()
        let pipe = Pipe()

        task.launchPath = "/usr/bin/php"
        task.arguments = [php_path, message_value]
        task.standardOutput = pipe

        task.launch()

        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let output = NSString(data: data, encoding: String.Encoding.utf8.rawValue)

        return output! as String;

    }

}
