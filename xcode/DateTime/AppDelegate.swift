//
//  AppDelegate.swift
//  DateTime
//
//  Created by Craig Francis on 04/03/2017.
//  Copyright © 2017 Craig Francis. All rights reserved.
//

import Cocoa

@NSApplicationMain

class AppDelegate: NSObject, NSApplicationDelegate {

    @IBOutlet weak var window: NSWindow!
    
    let statusItem = NSStatusBar.system().statusItem(withLength: NSSquareStatusItemLength)
    let popover = NSPopover();
    let dateViewController = DateTimeViewController(nibName: "DateTimeViewController", bundle: nil);
    
    func applicationDidFinishLaunching(_ aNotification: Notification) {

        if let button = statusItem.button {
            button.image = NSImage(named: "StatusBarButtonImage")
            button.action = #selector(AppDelegate.togglePopover)
        }

        popover.contentViewController = dateViewController
        popover.animates = false
        
    }

    func applicationWillTerminate(_ aNotification: Notification) {
        // Insert code here to tear down your application
    }

    func showPopover(sender: AnyObject?) {
        if let button = statusItem.button {
            
            popover.show(relativeTo: button.bounds, of: button, preferredEdge: NSRectEdge.minY);
            
            self.dateViewController?.windowShown();

        }
    }
    
    func closePopover(sender: AnyObject?) {
        popover.performClose(sender)
    }
    
    func togglePopover(sender: AnyObject?) {
        if popover.isShown {
            closePopover(sender: sender)
        } else {
            showPopover(sender: sender)
        }
    }
    
}

