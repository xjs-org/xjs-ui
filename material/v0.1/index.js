var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a2, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a2, prop, b[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b) => __defProps(a2, __getOwnPropDescs(b));

// src/material/layouts.js
var { htmlElements, createSignal, svgElements } = XJS;
var { div, header, main, footer, style, span, button, h3, p, img } = htmlElements;
var App = ({ appBar, body, navigationBar }, ...globals) => {
  return div(
    {
      // Global Theme Wrapper
      style: {
        backgroundColor: "var(--background-color:)",
        color: "var(--forground-color:)",
        transition: "all 0.3s ease",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        // Prevents body-bounce on mobile
        display: "flex",
        flexDirection: "column"
      }
    },
    appBar ? header(appBar) : null,
    main({
      style: {
        flex: 1,
        overflowY: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }
    }, body),
    navigationBar ? footer(navigationBar) : null,
    globals
  );
};
var Scaffold = ({ headerBar, sideBar, body, footerBar, actionButton } = {}) => {
  return [
    headerBar,
    sideBar,
    body,
    footerBar,
    actionButton ? div(
      {
        style: {
          position: "absolute",
          bottom: footerBar ? "96px" : "16px",
          right: "16px",
          zIndex: 100
        }
      },
      actionButton
    ) : null
  ];
};
var PageView = (pages = [], pageBuilder, { controller, physics = "scroll" } = {}) => {
  const pageLength = pages.length;
  return div(
    {
      style: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative"
      }
    },
    div(
      {
        style: {
          display: "flex",
          width: `${pageLength * 100}%`,
          height: "100%",
          transition: physics === "scroll" ? "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          transform: () => `translateX(-${controller.value * 100 / pageLength}%)`
        }
      },
      pages.map(
        (child) => div(
          {
            style: {
              width: `${100 / pageLength}%`,
              height: "100%",
              flexShrink: 0
            }
          },
          pageBuilder(child)
        )
      )
    )
  );
};
var Badge = (child, { label: label2, isDot = false } = {}) => {
  return div({
    style: "position: relative; display: inline-flex;"
  }, [
    child,
    () => show ? div({
      style: {
        position: "absolute",
        top: isDot ? "2px" : "-4px",
        right: isDot ? "2px" : "-4px",
        minWidth: isDot ? "8px" : "16px",
        height: isDot ? "8px" : "16px",
        padding: isDot ? "0" : "0 4px",
        backgroundColor: "var(--notification-color)",
        // M3 Error/Notification color
        color: "white",
        borderRadius: "100px",
        fontSize: "10px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: () => `2px solid var(--selected-color)`,
        pointerEvents: "none"
      }
    }, isDot ? "" : (label2 == null ? void 0 : label2.isSignal) ? label2.value : label2) : null
  ]);
};
var CircularProgress = ({ size = 24, color = "inherit", strokeWidth = 3 } = {}) => {
  const { svg: svg2, circle } = svgElements;
  if (!document.getElementById("m3-spinner-style")) {
    const spinnerStyle = style({
      id: "m3-spinner-style",
      textContent: `
      @keyframes m3-rotate { 100% { transform: rotate(360deg); } }
      @keyframes m3-dash {
        0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
        50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
        100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
      }
    `
    });
    document.head.append(spinnerStyle);
  }
  return svg2({
    viewBox: "0 0 50 50",
    width: size,
    height: size,
    style: {
      animation: "m3-rotate 2s linear infinite",
      display: "inline-block"
    }
  }, [
    circle({
      cx: 25,
      cy: 25,
      r: 20,
      fill: "none",
      stroke: color === "inherit" ? "var(--foreground-colo)" : color,
      strokeWidth,
      strokeLinecap: "round",
      style: {
        animation: "m3-dash 1.5s ease-in-out infinite"
      }
    })
  ]);
};
var LinearProgress = ({ value = null, color = "inherit", backgroundColor = "inherit" } = {}) => {
  if (!document.getElementById("m3-linear-style")) {
    let linearStyle = style({
      id: "m3-linear-style",
      textContent: `
      @keyframes m3-linear-indeterminate {
        0% { left: -35%; width: 33%; }
        60% { left: 100%; width: 33%; }
        100% { left: 100%; width: 33%; }
      }
      @keyframes m3-linear-indeterminate-short {
        0% { left: -200%; width: 33%; }
        60% { left: 107%; width: 33%; }
        100% { left: 107%; width: 33%; }
      }
    `
    });
    document.head.append(linearStyle);
  }
  const isIndeterminate = value === null;
  return div({
    style: {
      position: "relative",
      height: "4px",
      width: "100%",
      backgroundColor: () => backgroundColor === "inherit" ? `var(--foreground-colo)33` : backgroundColor,
      borderRadius: "2px",
      overflow: "hidden",
      display: "block"
    }
  }, [
    // The Progress Bar (Indicator)
    div({
      style: {
        position: "absolute",
        height: "100%",
        backgroundColor: color === "inherit" ? "var(--foreground-colo)" : color,
        borderRadius: "2px",
        transition: "width 0.2s linear",
        // Determinate logic
        width: () => isIndeterminate ? "auto" : `${((value == null ? void 0 : value.isSignal) ? value.value : value) * 100}%`,
        // Indeterminate logic
        animation: isIndeterminate ? "m3-linear-indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite" : "none",
        left: isIndeterminate ? "0" : "0"
      }
    }),
    // Second bar for the M3 indeterminate "staggered" look
    isIndeterminate ? div({
      style: {
        position: "absolute",
        height: "100%",
        backgroundColor: color === "inherit" ? "var(--selected-color)" : color,
        borderRadius: "2px",
        animation: "m3-linear-indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
        animationDelay: "1.15s"
      }
    }) : null
  ]);
};
var Snackbar = ({ message, isOpen, onAction, actionLabel, duration = 4e3 } = {}) => {
  const snackbar = div({
    style: {
      position: "fixed",
      bottom: "100px",
      // Sits above the NavigationBar
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 5e3,
      display: "flex",
      alignItems: "center",
      padding: "14px 16px",
      minWidth: "344px",
      maxWidth: "90vw",
      borderRadius: "4px",
      backgroundColor: "var(--selected-color)",
      // color: 'var(--background-color)',
      boxShadow: "0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14)",
      transition: "opacity 0.3s, transform 0.3s",
      pointerEvents: () => isOpen.value ? "auto" : "none",
      opacity: () => isOpen.value ? "1" : "0",
      // Slide up animation
      marginTop: () => isOpen.value ? "0px" : "20px"
    }
  }, [
    // Message Text
    span({
      style: { flex: 1, fontSize: "14px" }
    }, message),
    // Optional Action Button
    () => actionLabel ? button({
      onclick: () => {
        onAction == null ? void 0 : onAction();
        isOpen.value = false;
      },
      style: {
        background: "none",
        border: "none",
        color: "var(--background-color)",
        // M3 Light Primary
        fontWeight: "700",
        marginLeft: "16px",
        cursor: "pointer",
        textTransform: "uppercase"
      }
    }, actionLabel) : null
  ]);
  setTimeout(() => {
    isOpen.value = false;
  }, duration);
  return snackbar;
};
var Toast = ({ side = "top" } = {}) => {
  const ToastBar = div({
    style: {
      position: "fixed",
      top: side == "top" ? "10px" : "0px",
      bottom: side == "bottom" ? "100px" : "0px",
      // Slightly higher than the NavigationBar
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 9999,
      // Smooth slide and fade
      transition: "opacity 0.3s ease, transform 0.3s ease",
      marginTop: "0px"
    }
  }), toast = (message) => div({
    style: {
      background: "var(--foreground-colo)",
      color: "var(--background-color)",
      padding: "12px 24px",
      borderRadius: "50px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      marginBottom: "10px",
      animation: "fadeInUp 0.3s ease, fadeOutDown 0.3s ease 2.7s forwards"
    }
  }, message), showToast = (message, duration = 4e3) => {
    let t = toast(message);
    ToastBar.appendChild(t);
    setTimeout(() => {
      t.remove();
    }, duration);
  };
  return [ToastBar, showToast];
};
var ActionSheet = (actions = [], { onCancel } = {}) => {
  return [
    div({
      style: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        padding: "10px",
        alignItems: "center"
      }
    }, actions),
    button({
      style: {
        padding: "15px",
        marginTop: "5px",
        color: "red",
        fontWeight: "bold",
        background: "white",
        border: "none",
        borderRadius: "12px"
      },
      onclick: onCancel
    }, "Cancel")
  ];
};
var AlertDialog = (caption, { title, content, onConfirm } = {}) => {
  const opener = div(
    { style: "margin-top: 24px;" },
    button({
      onclick: () => isOpened.value = true,
      style: {
        background: "var(--notification-color)",
        color: "white",
        border: "none",
        padding: "12px 24px",
        borderRadius: "100px",
        cursor: "pointer"
      }
    }, caption)
  ), dialog = div(
    {
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2e3
      }
    },
    div({
      style: {
        background: "var(--background-color)",
        borderRadius: "28px",
        padding: "24px",
        maxWidth: "320px"
      }
    }, [
      h3(title),
      p(content),
      div({
        style: {
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
          marginTop: "20px"
        }
      }, [
        button({ onclick: () => isOpened.value = false }, "Cancel"),
        button({
          onclick: () => {
            onConfirm();
            isOpened.value = false;
          }
        }, "Confirm")
      ])
    ])
  );
  return [opener, dialog];
};
var Carousel = (images = [], { height = "200px" } = {}) => {
  return div(
    {
      style: {
        display: "flex",
        overflowX: "auto",
        scrollSnapType: "x mandatory",
        webkitOverflowScrolling: "touch",
        height,
        gap: "12px",
        padding: "0 16px",
        scrollbarWidth: "none"
      }
    },
    images.map((src) => img({
      src,
      style: {
        flex: "0 0 85%",
        // Shows 85% of image, peeking at the next one
        scrollSnapAlign: "center",
        borderRadius: "16px",
        objectFit: "cover",
        backgroundColor: "#eee"
      }
    }))
  );
};
var Accordion = ({ title, leading } = {}, child) => {
  const isOpened2 = createSignal(false);
  return div({ style: "background: #CAC4D0; overflow: hidden;" }, [
    // Header
    div({
      onclick: () => isOpened2.value = !isOpened2.value,
      style: "display: flex; align-items: center; padding: 16px; cursor: pointer; justify-content: space-between;"
    }, [
      div({ style: "display: flex; align-items: center; gap: 16px;" }, [
        leading,
        span({ style: "font-weight: 500;" }, title)
      ]),
      span({
        style: {
          transition: "transform 0.3s",
          transform: () => isOpened2.value ? "rotate(180deg)" : "rotate(0deg)"
        }
      }, "\u25BC")
    ]),
    // Collapsible Content
    () => isOpened2.value ? div({ style: "padding: 0 16px 16px 16px; color: #49454F;" }, child) : null
  ]);
};
var ListView = (items = [], { itemBuilder, scrollDirection = "vertical", separated = false, gap = "0px" } = {}) => {
  const isHorizontal = scrollDirection === "horizontal";
  return div(
    {
      style: {
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        width: "100%",
        gap,
        // Manage scrolling based on direction
        overflowX: isHorizontal ? "auto" : "hidden",
        overflowY: isHorizontal ? "hidden" : "auto",
        // Hide scrollbars for a cleaner "carousel" look on horizontal if desired
        msOverflowStyle: "none",
        scrollbarWidth: "none",
        "::-webkit-scrollbar": { display: "none" }
      }
    },
    itemBuilder ? () => items.map((item, index) => {
      const isLast = index === items.length - 1;
      return div(
        { style: isHorizontal ? "flex-shrink: 0;" : "width: 100%;" },
        [
          itemBuilder == null ? void 0 : itemBuilder(item, index),
          // Conditional Divider logic
          separated && !isLast ? div({
            style: isHorizontal ? "height: 80%; width: 1px; background: var(--selected-color); margin: auto 8px;" : "margin-left: 16px; border-bottom: 1px solid var(--selected-color);"
          }) : null
        ]
      );
    }) : items
  );
};
var ListTile = ({ leading, title, subtitle, trailing, onClick } = {}) => {
  return div(
    {
      onclick: onClick,
      style: {
        display: "flex",
        alignItems: "center",
        padding: "12px 16px",
        gap: "16px",
        cursor: onClick ? "pointer" : "default",
        backgroundColor: "transparent",
        transition: "background 0.2s",
        ":hover": { backgroundColor: "var(--selected-color)" }
        // If your library supports hover strings
      }
    },
    [
      // Leading Icon/Avatar
      leading ? div({ style: "color: var(--foreground-colo);" }, leading) : null,
      // Text Content
      div({ style: "flex: 1; display: flex; flex-direction: column;" }, [
        span({ style: "font-size: 16px; color: var(--foreground-colo);" }, title),
        subtitle ? span({ style: "font-size: 14px; color: var(--foreground-colo);" }, subtitle) : null
      ]),
      // Trailing Action/Meta
      trailing ? div({ style: "color: var(--foreground-colo);" }, trailing) : null
    ]
  );
};
var GridView = (items, { itemBuilder, crossAxisCount = 1, mainAxisSpacing = "16px", crossAxisSpacing = "16px", height = "auto" } = {}) => {
  return div(
    {
      style: {
        display: "grid",
        gridTemplateColumns: `repeat(${crossAxisCount}, 1fr)`,
        columnGap: crossAxisSpacing,
        rowGap: mainAxisSpacing,
        padding: "auto",
        width: "100%",
        height,
        boxSizing: "border-box",
        overflowY: "auto",
        flex: 1
      }
    },
    itemBuilder ? () => items.map((item, index) => itemBuilder(item, index)) : items
  );
};

// src/material/containers.js
var { htmlElements: htmlElements2 } = XJS;
var { div: div2, span: span2 } = htmlElements2;
var Container = (child, { width, height, padding, margin, color, decoration, alignment } = {}) => {
  return div2(
    {
      style: {
        width: width || "auto",
        height: height || "auto",
        padding: padding || "0",
        margin: margin || "0",
        backgroundColor: color || "transparent",
        // Decoration logic (Borders, Corners, Shadows)
        borderRadius: (decoration == null ? void 0 : decoration.borderRadius) || "0",
        border: (decoration == null ? void 0 : decoration.border) || "none",
        boxShadow: (decoration == null ? void 0 : decoration.boxShadow) || "none",
        // Alignment logic
        display: alignment ? "flex" : "block",
        alignItems: alignment === "center" ? "center" : "stretch",
        justifyContent: alignment === "center" ? "center" : "flex-start",
        boxSizing: "border-box",
        transition: "all 0.2s ease"
      }
    },
    child
  );
};
var Flex = (child, { direction = "column", justifyContent = "flex-start", alignItems = "flex-start", gap = "0px", flex = "1" } = {}) => {
  return div2({
    style: {
      display: "flex",
      flexDirection: direction,
      justifyContent,
      alignItems,
      gap,
      flex,
      width: direction === "row" ? "100" : "inherit",
      height: direction === "column" ? "100%" : "inherit",
      boxSizing: "border-box"
    }
  }, child);
};
var SizedBox = (child, { width = "auto", height = "auto" } = {}) => {
  return div2({
    style: {
      width,
      height,
      display: child ? "inline-block" : "block"
    }
  }, child || "");
};
var Placeholder = ({ color = "var(--selected-color)", fallbackHeight = "inherit", fallbackWidth = "inherit" } = {}) => {
  const lineStyle = {
    position: "absolute",
    width: "150%",
    height: "2px",
    background: color,
    top: "50%",
    left: "-25%",
    transform: "rotate(45deg)"
  };
  return div2({
    style: {
      width: fallbackWidth,
      height: fallbackHeight,
      border: `2px solid ${color}`,
      position: "relative",
      backgroundColor: "rgba(0, 0, 0, 0.05)",
      overflow: "hidden"
    }
  }, [
    // The "X" lines
    div2({ style: __spreadProps(__spreadValues({}, lineStyle), { transform: "rotate(45deg)" }) }),
    div2({ style: __spreadProps(__spreadValues({}, lineStyle), { transform: "rotate(-45deg)" }) })
  ]);
};
var Column = (child, { mainAxisAlignment = "start", crossAxisAlignment = "stretch", reverse = false, gap = "0px" } = {}) => Flex(child, {
  gap,
  mainAxisAlignment,
  crossAxisAlignment,
  direction: reverse ? "column-reverse" : "column"
});
var Row = (child, { mainAxisAlignment = "start", reverse = false } = {}) => Flex(child, {
  mainAxisAlignment,
  direction: reverse ? "row-reverse" : "row"
});
var Card = (child, { onClick } = {}) => div2(
  {
    onclick: onClick,
    style: "background: var(--background-color); border-radius: 12px; padding: 16px; border: 1px solid #CAC4D0; display: flex; flex-direction: column; gap: 8px;"
  },
  child
);
var Chip = ({ caption, selected = false, avatar, onClick } = {}) => {
  const isSelected = () => typeof selected === "function" ? selected() : selected;
  return div2({
    onclick: onClick,
    style: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 16px",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "500",
      transition: "all 0.2s ease",
      backgroundColor: () => isSelected() ? "var(--background-color)" : "transparent",
      color: () => isSelected() ? "var(--selected-color)" : "var(--background-color)",
      outline: "none"
    }
  }, [
    avatar ? div2({ style: "width: 18px; height: 18px;" }, avatar) : null,
    span2(caption),
    () => isSelected() ? span2({ style: "font-size: 14px;" }, "\u2713") : null
  ]);
};

// src/material/inputs.js
var { htmlElements: htmlElements3 } = XJS;
var { form, div: div3, label, input, span: span3, button: button2, img: img2 } = htmlElements3;
var Form = ({ fields, onSubmit, onValidate } = {}) => {
  return form({
    onsubmit: (e) => {
      var _a;
      e.preventDefault();
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      let isValid = (_a = onValidate == null ? void 0 : onValidate({ e, formData, payload })) != null ? _a : true;
      if (isValid) onSubmit({ e, formData, payload });
    },
    style: "display: flex; flex-direction: column; gap: 20px; width: 100%;"
  }, fields);
};
var InputField = ({ controller, caption, type = "text", hint = "", obscureText = false, validate } = {}) => {
  const isFocused = signal.isFocused(false), inputType = obscureText ? "password" : type;
  return div3(
    {
      style: {
        display: "flex",
        flexDirection: "column",
        margin: "16px 0",
        position: "relative",
        width: "100%"
      }
    },
    // Floating Label Logic
    label({
      style: {
        fontSize: isFocused.value || controller.value ? "12px" : "16px",
        position: "absolute",
        top: isFocused.value || controller.value ? "-10px" : "12px",
        left: "8px",
        transition: "all 0.2s ease",
        padding: "0 4px",
        pointerEvents: "none",
        zIndex: 1
      }
    }, caption),
    // The Input element
    input({
      type: inputType,
      placeholder: () => isFocused.value ? hint : "",
      value: () => controller.value,
      onfocus: () => isFocused.value = true,
      onblur: () => (isFocused.value = false, validate),
      oninput: (e) => controller.value = e.target.value,
      // Support for numeric inputs (step, min, max can be added via props)
      style: {
        padding: "12px",
        fontSize: "16px",
        border: `2px solid ${isFocused.value ? "var(--selected-color)" : "none"}`,
        borderRadius: "4px",
        outline: "none",
        backgroundColor: "transparent",
        transition: "border-color 0.2s ease"
      }
    })
  );
};
var TextField = ({ value, caption, hint, validate } = {}) => InputField({ controller: value, caption, type: "text", hint, validate });
var PasswordField = ({ value, caption, hint, validate } = {}) => InputField({ controller: value, caption, hint, validate, obscureText: true });
var EmailField = ({ value, caption, hint, validate } = {}) => InputField({ controller: value, caption, hint, validate, type: "email" });
var NumericField = ({ value, caption, hint, validate } = {}) => InputField({ controller: value, caption, hint, validate, obscurtype: "number" });
var Button = (caption, { variant = "Filled", icon = null, onclick, disabled = false } = {}) => {
  const variants = {
    Filled: {
      bg: "var(--selected-color)",
      text: "var(--foreground-color)",
      border: "none",
      shadow: "none"
    },
    Elevated: {
      bg: "var(--selected-color)",
      text: "var(--foreground-color)",
      border: "none",
      shadow: "0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1)"
    },
    Tonal: {
      bg: "var(--selected-color)25",
      // ~15% opacity
      text: "var(--background-color)",
      border: "none",
      shadow: "none"
    },
    Outlined: {
      bg: "transparent",
      text: "var(--foreground-color)",
      border: "1px solid var(--selected-color)",
      shadow: "none"
    },
    Text: {
      bg: "transparent",
      text: "var(--foreground-color)",
      border: "none",
      shadow: "none"
    },
    Floating: {
      bg: "var(--selected-color)",
      text: "var(--background-color)",
      border: "none",
      shadow: "0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)"
    }
  };
  const current = variants[variant];
  return button2({
    onclick,
    disabled,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: variant === "Floating" ? "16px" : "10px 24px",
      borderRadius: variant === "Floating" ? "16px" : "100px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      // Reactive styling
      backgroundColor: current.bg,
      color: current.text,
      border: current.border,
      boxShadow: current.shadow,
      opacity: () => disabled ? "0.38" : "1"
    }
  }, [
    icon,
    caption ? span3(caption) : null
  ]);
};
var ActionButton = (child, { onClick }) => {
  return button2({
    onclick: onClick,
    style: {
      position: "fixed",
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      border: "none",
      background: "rgba(0,0,0,0.05)",
      // Subtle grey circle
      cursor: "pointer",
      fontSize: "20px",
      display: "grid",
      placeItems: "center"
    }
  }, child);
};
var FloatingButton = (title, { onclick } = {}) => {
  return button2({
    style: {
      width: "56px",
      height: "56px",
      borderRadius: "28px",
      background: "var(--primary-color)",
      border: "none",
      fontSize: "24px",
      color: "var(--background-color)",
      cursor: "pointer"
    },
    onclick
  }, title);
};
var IconButton = (icon, { caption, onClick, color } = {}) => {
  return button2({
    onclick: onClick,
    style: {
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "none",
      backgroundColor: "transparent",
      cursor: "pointer",
      transition: "background 0.2s ease",
      color: color || "var(--foreground-color)",
      outline: "none",
      // Simulating hover/ripple effect
      ":hover": { backgroundColor: "var(--selected-color)" },
      ":active": { backgroundColor: "var(--selected-color)" }
    }
  }, icon || caption || "caption");
};
var Switch = ({ controller } = {}) => {
  const toggle = () => controller.value = !controller.value;
  return div3(
    {
      onclick: toggle,
      style: {
        width: "50px",
        height: "30px",
        borderRadius: "15px",
        backgroundColor: () => controller.value ? "var(--primary-color)" : "var(--selected-color)",
        position: "relative",
        transition: "0.3s",
        cursor: "pointer"
      }
    },
    div3({
      style: {
        width: "26px",
        height: "26px",
        backgroundColor: "var(--background-color)",
        borderRadius: "50%",
        position: "absolute",
        top: "2px",
        left: () => controller.value ? "22px" : "2px",
        transition: "0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.3)"
      }
    })
  );
};
var Checkbox = (caption, { controller } = {}) => {
  const toggle = () => controller.value = !controller.value;
  return div3(
    {
      onclick: toggle,
      style: "display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px 0;"
    },
    // The Square Box
    div3(
      {
        style: {
          width: "18px",
          height: "18px",
          borderRadius: "4px",
          border: `2px solid ${controller.value ? "var(--selected-color)" : "none"}`,
          backgroundColor: controller.value ? "var(--selected-color)" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.2s ease"
        }
      },
      // The Checkmark
      () => controller.value ? span3({ style: "color: white; font-size: 14px; font-weight: bold;" }, "\u2713") : null
    ),
    span3({ style: { fontSize: "16px" } }, caption)
  );
};
var Radio = (caption, { controller, value } = {}) => {
  const isSelected = () => controller.value === value;
  return div3(
    {
      onclick: () => controller.value = value,
      style: "display: flex; align-items: center; gap: 12px; cursor: pointer; padding: 8px 0;"
    },
    // The Outer Circle
    div3(
      {
        style: {
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${isSelected() ? "var(--selected-color)" : "none"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border 0.2s ease"
        }
      },
      // The Inner Dot
      () => isSelected() ? div3({
        style: {
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: "var(--selected-color)"
        }
      }) : null
    ),
    span3({ style: { fontSize: "16px" } }, caption)
  );
};
var Slider = ({ controller, min = 0, max = 100 } = {}) => {
  return div3(
    { style: "width: 100%; padding: 12px 0; display: flex; align-items: center;" },
    input({
      type: "range",
      min,
      max,
      value: () => controller.value,
      oninput: (e) => controller.value = e.target.value,
      style: () => {
        const percent = (controller.value - min) / (max - min) * 100;
        return {
          webkitAppearance: "none",
          width: "100%",
          height: "4px",
          borderRadius: "2px",
          background: `linear-gradient(to right, var(--foreground-color) ${percent}%, var(--background-color) ${percent}%)`,
          outline: "none",
          cursor: "pointer"
        };
      }
    }),
    // Value Label (Optional)
    span3(
      { style: "margin-left: 12px; min-width: 30px; font-family: monospace;" },
      () => controller.value
    )
  );
};
var Picker = ({ controller, caption, type } = {}) => {
  const isFocused = signal.isFocused;
  return div3(
    { style: "position: relative; margin: 16px 0; width: 100%;" },
    span3({
      style: {
        fontSize: "12px",
        color: isFocused.value ? "var(--background-color)" : "var(--selected-color)",
        position: "absolute",
        top: "-10px",
        left: "8px",
        background: "var(--selected-color)",
        padding: "0 4px",
        zIndex: 1
      }
    }, caption),
    input({
      type,
      value: () => controller.value,
      onfocus: () => isFocused.value = true,
      onblur: () => isFocused.value = false,
      oninput: (e) => controller.value = e.target.value,
      style: {
        width: "100%",
        padding: "12px",
        fontSize: "16px",
        border: `1px solid ${isFocused.value ? "var(--selected-color)" : "none"}`,
        borderRadius: "4px",
        backgroundColor: "transparent",
        outline: "none",
        fontFamily: "inherit"
      }
    })
  );
};
var DatePicker = (props) => Picker(__spreadProps(__spreadValues({}, props), { type: "date" }));
var TimePicker = (props) => Picker(__spreadProps(__spreadValues({}, props), { type: "time" }));
var Image = (imageSrc, { width, height, fit = "cover" } = {}) => {
  return img2({
    src: imageSrc,
    style: { width, height, objectFit: fit }
  });
};
var Logo = (child, { onClick } = {}) => {
  return div3({
    style: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "0 15px",
      minWidth: "28px",
      height: "56px",
      borderRadius: "5px",
      border: "none",
      fontSize: "4rem",
      fontWeight: "bold",
      cursor: "pointer",
      background: "var(--primary-color)"
    },
    onclick: onClick
  }, child);
};

// src/material/styles.js
var { htmlElements: htmlElements4, createSignal: createSignal2 } = XJS;
var { div: div4, hr, bold, span: span4, button: button3 } = htmlElements4;
var Text = (content, { fontSize, color, fontWeight, fontFamily } = {}) => {
  return span4({
    style: {
      fontSize: fontSize || "inherit",
      color: color || "inherit",
      fontWeight: fontWeight || "inherit",
      fontFamily: fontFamily || "inherit"
    }
  }, content);
};
var Heading = (child, { variant = "h3", fontSize } = {}) => {
  return htmlElements4[variant]({
    style: {
      padding: "5px 16px",
      fontSize
    }
  }, child);
};
var Center = (child) => {
  return div4({
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      width: "100%",
      height: "100%",
      flex: "1"
      // Take up available space in Flex parents
    }
  }, child);
};
var Border = (child, { side = "all", border = "1px solid var(--selected-color)", radius = "0px" } = {}) => {
  const borderStyle = {
    borderRadius: radius,
    overflow: "hidden",
    // Ensures child content doesn't bleed over corners
    display: "inline-block",
    width: "100%",
    boxSizing: "border-box"
  };
  borderStyle["border" + (side == "all" ? "" : "-" + side)] = border;
  return div4({
    style: borderStyle
  }, child);
};
var Margin = (child, { side = "all", margin = "0px" } = {}) => {
  const marginStyle = {
    display: "block",
    // Ensures margin is respected in the flow
    boxSizing: "border-box"
  };
  marginStyle["margin" + (side == "all" ? "" : "-" + side)] = margin;
  return div4({
    style: marginStyle
  }, child);
};
var Padding = (child, { side = "all", padding = "0px" } = {}) => {
  const paddingStyle = {
    display: "inline-block",
    // Wraps tightly around child
    width: "100%",
    boxSizing: "border-box"
  };
  paddingStyle["padding" + (side == "all" ? "" : "-" + side)] = padding;
  return div4({
    style: paddingStyle
  }, child);
};
var Transform = (child, { transform = "", origin = "center" } = {}) => {
  return div4({
    style: {
      display: "inline-block",
      transform: () => (transform == null ? void 0 : transform.isSignal) ? transform.value : transform,
      transformOrigin: origin,
      transition: "transform 0.2s ease-out"
    }
  }, child);
};
var Opacity = (child, { opacity = 1 } = {}) => {
  return div4({
    style: {
      opacity: () => (opacity == null ? void 0 : opacity.isSignal) ? opacity.value : opacity,
      transition: "opacity 0.2s linear",
      pointerEvents: ((opacity == null ? void 0 : opacity.isSignal) ? opacity.value : opacity) < 0.1 ? "none" : "auto"
    }
  }, child);
};
var Align = (child, { alignment = "center" } = {}) => {
  const map = {
    "top-left": { x: "flex-start", y: "flex-start" },
    "top-center": { x: "center", y: "flex-start" },
    "top-right": { x: "flex-end", y: "flex-start" },
    "center": { x: "center", y: "center" },
    "bottom-left": { x: "flex-start", y: "flex-end" },
    "bottom-center": { x: "center", y: "flex-end" },
    "bottom-right": { x: "flex-end", y: "flex-end" }
  };
  const pos = map[alignment] || map.center;
  return div4({
    style: {
      display: "flex",
      justifyContent: pos.x,
      alignItems: pos.y
    }
  }, child);
};
var Expanded = (child, { flex = 1 } = {}) => {
  return div4({
    style: {
      flex,
      display: "flex",
      flexDirection: "column"
    }
  }, child);
};
var Marker = ({ width = "100%", height = "1px", color = "var(--primary-color)" } = {}) => {
  return div4({
    style: {
      width,
      height,
      background: color,
      borderRadius: "2px",
      alignSelf: "center"
    }
  });
};
var Divider = ({ indent = "0px" } = {}) => {
  return hr({
    style: `margin: 0; margin-left: ${indent}; border: 0; border-top: 1px solid var(--selected-color);`
  });
};
var Bold = (child, { fontSize = "25px" } = {}) => {
  return bold({
    style: {
      fontSize
    }
  }, child);
};
var Movable = (child, { initialX = window.innerWidth, initialY = window.innerHeight } = {}) => {
  const isMoving = createSignal2(false), x = createSignal2(initialX), y = createSignal2(initialY);
  let offset = { x: 0, y: 0 };
  const onPointerDown = (e) => {
    isMoving.value = true;
    offset.x = e.clientX - x.value;
    offset.y = e.clientY - y.value;
    e.target.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!isMoving.value) return;
    x.value = e.clientX - offset.x;
    y.value = e.clientY - offset.y;
  };
  const onPointerUp = (e) => {
    isMoving.value = false;
    e.target.releasePointerCapture(e.pointerId);
  };
  return div4({
    onpointerdown: onPointerDown,
    onpointermove: onPointerMove,
    onpointerup: onPointerUp,
    style: {
      position: "fixed",
      cursor: () => isMoving.value ? "grabbing" : "grab",
      // Reactive coordinates
      left: () => `${x.value}px`,
      top: () => `${y.value}px`,
      // Visual feedback
      touchAction: "none",
      // Prevents scrolling while moving on mobile
      transition: () => isMoving.value ? "none" : "transform 0.1s ease",
      boxShadow: () => isMoving.value ? "0 12px 24px rgba(0,0,0,0.2)" : "0 4px 8px rgba(0,0,0,0.1)",
      transform: () => isMoving.value ? "scale(1.02)" : "scale(1)"
    }
  }, child);
};
var Position = (child, {
  top = "auto",
  right = "auto",
  bottom = "auto",
  left = "auto",
  width = "auto",
  height = "auto",
  zIndex = 1e3
} = {}) => {
  return div4({
    style: {
      position: "absolute",
      top,
      right,
      bottom,
      left,
      width,
      height,
      zIndex
    }
  }, child);
};

// src/material/navigations.js
var { htmlElements: htmlElements5, createSignal: createSignal3 } = XJS;
var { div: div5, aside, span: span5, button: button4, nav, hr: hr2, footer: footer2, a } = htmlElements5;
var AppBar = ({ leading = null, title, actions = [] } = {}) => {
  return div5(
    {
      style: {
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        borderBottom: "1px solid var(--outline-color)",
        justifyContent: "space-between"
      }
    },
    // 1. Leading Section
    div5({ style: "display: flex; alignItems: center;" }, leading),
    // 2. Title Section
    span5({ style: "font-size: 22px; font-weight: 400;" }, title),
    // 3. Actions Section
    div5({ style: "display: flex; alignItems: center;" }, actions)
  );
};
var TabBar = (tabs, { selected, position = "top" } = {}) => {
  if (!selected) return null;
  return div5({
    style: {
      // position:"fixed",
      display: "flex",
      width: "100%",
      height: "5rem",
      zIndex: 10,
      // Ensures it stays above content
      flexShrink: 0,
      // Prevents header from squishing
      borderBottom: position === "top" ? "1px solid var(--outline-color)" : "none",
      borderTop: position === "bottom" ? "1px solid var(--outline-color)" : "none"
    }
  }, tabs.map((tab, index) => {
    const isSelected = () => selected.value === index;
    const label2 = typeof tab === "string" ? tab : tab.label;
    const icon = tab.icon || null;
    return div5({
      onclick: () => selected.value = index,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        position: "relative",
        gap: "4px"
      }
    }, [
      icon ? span5({ style: { fontSize: "18px" } }, icon) : null,
      span5({
        style: {
          fontSize: "1.4rem",
          // fontWeight: () => isSelected() ? '600' : '400',
          borderRadius: "80px",
          padding: "10px 25px",
          backgroundColor: () => isSelected() ? "var(--outline-color)" : "transparent",
          transition: "background 0.5s"
        }
      }, label2)
    ]);
  }));
};
var Sidebar = (child, { side = "left", isOpen } = {}) => {
  const isVertical = side === "left" || side === "right";
  return [
    div5(
      {
        style: {
          position: "fixed",
          zIndex: 1e3,
          backgroundColor: "var(--background-color)",
          boxShadow: "0 8px 10px rgba(0,0,0,0.15)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          // Dimensions based on orientation
          width: isVertical ? "300px" : "100%",
          height: isVertical ? "100%" : "auto",
          maxHeight: isVertical ? "100%" : "80vh",
          // Positioning logic
          top: side === "bottom" ? "auto" : "0",
          bottom: side === "top" ? "auto" : "0",
          left: side === "right" ? "auto" : "0",
          right: side === "left" ? "auto" : "0",
          // Reactivity: Slide direction
          transform: () => {
            if (isOpen.value) return "translate(0, 0)";
            const map = {
              left: "translateX(-100%)",
              right: "translateX(100%)",
              top: "translateY(-100%)",
              bottom: "translateY(100%)"
            };
            return map[side];
          },
          // Material 3 styling
          borderRadius: () => {
            if (side === "left") return "0 16px 16px 0";
            if (side === "right") return "16px 0 0 16px";
            if (side === "top") return "0 0 16px 16px";
            return "16px 16px 0 0";
          }
        }
      },
      Position(
        ActionButton("\u2715", { onClick: () => isOpen.value = false }),
        {
          right: "50px",
          top: "15px"
        }
      ),
      child
    ),
    div5({
      onclick: () => {
        isOpen.value = false;
      },
      style: {
        position: "fixed",
        inset: "0",
        backgroundColor: "var(--selected-color)",
        zIndex: 999,
        // Reactivity
        opacity: () => isOpen.value ? ".6" : "0",
        pointerEvents: () => isOpen.value ? "auto" : "none",
        transition: "opacity 0.6s ease"
      }
    })
  ];
};
var Pagination = ({ total, current, onPageChange } = {}) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1), btnStyle = {
    color: "var(--foreground-color)",
    cursor: "pointer",
    width: "40px",
    border: "none",
    height: "40px"
  };
  return nav(
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        justifyContent: "center",
        padding: "20px"
      }
    },
    button4({
      onclick: () => onPageChange(current.value - 1),
      disabled: () => current.value === 1,
      style: btnStyle
    }, "<"),
    ...pages.map((page) => button4({
      onclick: () => onPageChange(page),
      style: __spreadProps(__spreadValues({}, btnStyle), {
        borderRadius: "20px",
        backgroundColor: () => current.value === page ? "var(--selected-color)" : "transparent"
      })
    }, page)),
    button4({
      onclick: () => onPageChange(current.value + 1),
      disabled: () => current.value === total,
      style: btnStyle
    }, ">")
  );
};
var Breadcrumbs = ({ paths } = {}) => {
  return nav(
    {
      style: {
        display: "flex",
        gap: "8px",
        fontSize: "14px",
        color: "var(--selected - color)",
        padding: "12px 0"
      }
    },
    paths.map((path2, index) => [
      span5({
        onclick: path2.onclick,
        style: {
          cursor: "pointer",
          color: "var(--foreground-color)",
          fontWeight: "500"
        }
      }, path2.label),
      index < paths.length - 1 ? span5({ style: "color: var(--foreground-color);" }, "/") : null
    ])
  );
};
var NavigationRail = (destinations = [], { selecetd, navigationHeader } = {}) => {
  return aside(
    {
      style: {
        // width: '80px',
        height: "100%",
        backgroundColor: "var(--background-color)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 0",
        gap: "20px",
        borderRight: "1px solid var(--selected-color)"
      }
    },
    navigationHeader,
    destinations.map((dest, i) => div5(
      {
        onclick: dest.onclick,
        style: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          gap: "4px",
          borderBottom: () => selecetd.value == i ? "2px solid var(--primary-color)" : "none"
        }
      },
      dest.icon ? div5({
        style: {
          width: "56px",
          height: "32px",
          borderRadius: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s"
        }
      }, dest.icon) : null,
      span5({
        style: {
          fontSize: "12px",
          fontWeight: "500",
          padding: "0 5px"
        }
      }, dest.label)
    ))
  );
};
var BottomAppBar = ({ actions = [], fab } = {}) => {
  return footer2({
    style: {
      height: "80px",
      display: "flex",
      alignItems: "center",
      padding: "0 16px",
      position: "relative",
      borderTop: "1px solid var(--selected-color)"
    }
  }, [
    div5({ style: "display: flex; gap: 24px; flex: 1;" }, actions),
    fab ? div5({ style: "position: absolute; right: 16px; top: -28px;" }, fab) : null
  ]);
};
var PopupMenu = (items, { icon } = {}) => {
  const isOpened2 = createSignal3(false), handleOutsideClick = (e) => {
    if (isOpened2.value) {
      isOpened2.value = false;
      window.removeEventListener("click", handleOutsideClick);
    }
  };
  const toggleMenu = (e) => {
    e.stopPropagation();
    isOpened2.value = !isOpened2.value;
    if (isOpened2.value) {
      window.addEventListener("click", handleOutsideClick);
    }
  };
  return div5({ style: "position: relative; display: inline-block;" }, [
    // The Trigger
    div5({
      onclick: toggleMenu,
      style: "cursor: pointer; padding: 8px; border-radius: 50%; display: flex;"
    }, icon),
    // The Menu Overlay
    () => isOpened2.value ? div5({
      style: {
        position: "absolute",
        top: "100%",
        right: "0",
        backgroundColor: "var(--background-color)",
        minWidth: "150px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        borderRadius: "4px",
        padding: "8px 0",
        zIndex: 1e3,
        display: "flex",
        flexDirection: "column"
      }
    }, items.map((item) => div5({
      onclick: () => {
        item.onclick();
        isOpened2.value = false;
      },
      className: "hover",
      style: {
        padding: "12px 16px",
        fontSize: "14px",
        cursor: "pointer",
        color: "var(--foreground-color)",
        transition: "background 0.2s"
      }
    }, item.label))) : null
  ]);
};
var NavigationDestination = ({ icon, caption, selected, onclick } = {}) => {
  return div5({
    onclick,
    style: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "4px",
      cursor: "pointer",
      height: "100%"
    }
  }, [
    // The Active Indicator Pill
    div5({
      style: {
        width: "64px",
        height: "32px",
        borderRadius: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.2s ease",
        backgroundColor: () => selected() ? "var(--outline-color)" : "transparent"
      }
    }, icon),
    // Label
    span5({
      style: {
        fontSize: "12px",
        fontWeight: () => selected() ? "700" : "500",
        transition: "all 0.2s"
      }
    }, caption),
    () => selected() ? div5({
      style: {
        position: "absolute",
        bottom: 0,
        width: "20%",
        // M3 tabs usually have a shorter indicator than the full width
        height: "1rem",
        borderRadius: "3px 3px 0 0",
        borderBottom: () => selected() ? "2px solid var(--primary-color)" : "none"
      }
    }) : null
  ]);
};
var NavigationBar = ({ destinations = [] } = {}) => {
  return div5({
    style: {
      height: "5rem",
      display: "flex",
      borderTop: "1px solid var(--outline-color)",
      paddingBottom: "env(safe-area-inset-bottom)",
      width: "100%",
      boxSizing: "border-box"
    }
  }, destinations);
};
var ContextMenu = (Opener, Items = [], { clientX = 0, clientY = 0 } = {}) => {
  const isOpened2 = createSignal3(false), showContextMenu = (event) => {
    event.preventDefault();
    clientX = event.clientX;
    clientY = event.clientY;
    isOpened2.value = true;
  }, MenuItems = div5({
    onclick: () => isOpened2.value = false,
    style: "position: fixed; inset: 0; z-index: 3000;"
  }, [
    div5({
      style: {
        position: "absolute",
        left: `${clientX}px`,
        top: `${clientY}px`,
        backgroundColor: "var(--background-color)",
        borderRadius: "4px",
        boxShadow: "0 2px 8px var(--selected-color)",
        padding: "8px 0",
        minWidth: "112px"
      }
    }, Items.map((item) => div5({
      onclick: () => {
        item.onclick();
        isOpened2.value = false;
      },
      style: "padding: 12px 16px; cursor: pointer; font-size: 14px; transition: background 0.2s;"
    }, item.label)))
  ]);
  return div5(
    {
      style: "padding: 8px 0;"
    },
    [div5({ onclick: (e) => showContextMenu(e) }, Opener), MenuItems]
  );
};
var Menu = (items = [], { title, onItemClick } = {}) => {
  return [
    div5({ style: "padding: 16px; font-weight: 600;" }, title),
    hr2(),
    items.map((item) => div5({
      onclick: (e) => onItemClick({ e, item }),
      style: "padding: 12px 16px; border-radius: 100px; cursor: pointer; margin: 4px 0;"
    }, item.label))
  ];
};
var Link = (text, {
  href = "javascript:void(0)",
  onClick,
  size = "24px",
  showIcon = true
} = {}) => {
  const isHovered = createSignal3(false), isExternal = /^https?:\/\//.test(href) || /^www\./.test(href);
  return a(
    {
      href,
      target: isExternal ? "_blank" : "_self",
      rel: isExternal ? "noopener noreferrer" : "",
      onpointerenter: () => isHovered.value = true,
      onpointerleave: () => isHovered.value = false,
      onclick: (e) => {
        if (onClick) {
          e.preventDefault();
          onClick(e);
        }
      },
      style: {
        cursor: "pointer",
        textDecoration: () => isHovered.value ? "underline" : "none",
        color: () => isHovered.value ? `var(--primary-color)` : "var(--foreground-color)",
        transition: "color 0.2s ease, text-decoration 0.2s ease",
        display: "inline-flex",
        alignItems: "center",
        gap: "4px"
      }
    },
    span5({
      style: { size, height: "20px", spacing: "1px", weight: "600", padding: "5px" }
    }, text),
    isExternal && showIcon ? span5({
      style: {
        fontSize: "0.85em",
        opacity: "0.7",
        transition: "transform 0.2s ease",
        transform: () => isHovered.value ? "translate(2px, -2px)" : "none"
      }
    }, "\u2197") : null
  );
};

// src/material/selectors.js
var { htmlElements: htmlElements6 } = XJS;
var { div: div6, span: span6, button: button5 } = htmlElements6;
var SingleSelector = (options = [], { selected } = {}) => {
  return div6(
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        padding: "8px 0"
      }
    },
    options.map((option) => {
      const isSelected = () => selected.value === option;
      return Chip({
        label: option.value,
        avatar: option.icon,
        selected: isSelected,
        onClick: () => selected.value = option
      });
    })
  );
};
var MultiSelector = (options = [], { selected } = {}) => {
  const toggle = (option) => {
    const current = [...selected.value];
    const index = current.indexOf(option);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(option);
    }
    selected.value = current;
  };
  return div6(
    {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px",
        padding: "8px 0"
      }
    },
    options.map((option) => {
      const isSelected = () => selected.value.includes(option);
      return Chip({
        label: option.value,
        avatar: option.icon,
        selected: isSelected,
        onClick: () => toggle(option)
      });
    })
  );
};
var SegmentedListSelector = (segments = [], { selected } = {}) => {
  return div6(
    {
      style: {
        display: "inline-flex",
        borderRadius: "20px",
        border: "1px solid var(--selected-color)",
        overflow: "hidden",
        backgroundColor: "transparent"
      }
    },
    segments.map((segment, index) => {
      const isSelected = () => selected.value === segment;
      const isLast = index === segments.length - 1;
      return button5(
        {
          onclick: () => selected.value = segment,
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 24px",
            border: "none",
            borderRight: isLast ? "none" : "1px solid var(--selected-color)",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s ease",
            backgroundColor: () => isSelected() ? "var(--selected-color)" : "transparent",
            outline: "none"
          }
        },
        [
          // Optional Icon
          segment.icon ? span6(segment.icon) : null,
          // Label
          span6(segment.value),
          // M3 specification: Show checkmark icon if selected
          () => isSelected() ? span6({ style: "font-size: 16px" }, "\u2713") : null
        ]
      );
    })
  );
};

// src/material/icons.js
var { htmlElements: htmlElements7, svgElements: svgElements2 } = XJS;
var { span: span7 } = htmlElements7;
var { path, svg } = svgElements2;
var SvgIcon = (pathData, { size = 24, opacity = 1, color = "var(--foreground-color)" } = {}) => {
  const svgPath = path();
  svgPath.setAttribute("d", pathData);
  const svgIcon = svg({
    style: {
      fill: color,
      display: "inline-block",
      flexShrink: 0,
      transition: "fill 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }, svgPath);
  svgIcon.setAttribute("viewBox", "0 0 24 24");
  svgIcon.setAttribute("height", size);
  svgIcon.setAttribute("fill-opacity", opacity);
  return svgIcon;
};
var Icon = (child, { size = 24, color = "inherit", weight = 200 } = {}) => {
  return span7({
    style: {
      // Font settings to replace a CSS class
      fontFamily: "Material Symbols Outlined",
      fontWeight: weight,
      fontStyle: "normal",
      fontSize: `${size}px`,
      lineHeight: 1,
      letterSpacing: "normal",
      textTransform: "none",
      display: "inline-block",
      whiteSpace: "nowrap",
      wordWrap: "normal",
      direction: "ltr",
      fontFeatureSettings: "liga",
      // Layout & Color
      width: `${size}px`,
      height: `${size}px`,
      color: color === "inherit" ? "var(--foreground-color)" : color,
      userSelect: "none",
      textAlign: "center",
      // Standard web-font smoothing
      webkitFontSmoothing: "antialiased",
      textRendering: "optimizeLegibility",
      mozOsxFontSmoothing: "grayscale"
    }
  }, child);
};

// src/index.js
var Layouts = { App, Scaffold, ActionSheet, Card, Chip, CircularProgress, LinearProgress, PageView, Snackbar, Toast, Badge, Accordion, AlertDialog, Carousel };
var Containers = { ListView, ListTile, Column, Container, Flex, GridView, Placeholder, Row, SizedBox };
var Navigations = { Link, Menu, Sidebar, TabBar, AppBar, Breadcrumbs, Pagination, ContextMenu, NavigationBar, NavigationDestination, NavigationRail, PopupMenu, BottomAppBar };
var Inputs = { ActionButton, FloatingButton, Text, TextField, EmailField, PasswordField, NumericField, Form, Button, IconButton, Logo, Switch, Checkbox, DatePicker, Image, Radio, Slider, InputField, TimePicker };
var Selectors = { SingleSelector, MultiSelector, SegmentedListSelector };
var Styles = { Center, Margin, Movable, Align, Bold, Border, Divider, Expanded, Marker, Opacity, Padding, Transform, Heading, Position };
var Icons = { Icon, SvgIcon };
globalThis.Material = {
  Containers,
  Icons,
  Inputs,
  Layouts,
  Navigations,
  Selectors,
  Styles
};
export {
  Containers,
  Icons,
  Inputs,
  Layouts,
  Navigations,
  Selectors,
  Styles
};
