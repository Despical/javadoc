// Compact usage examples adapted from the linked project sources.
// Surrounding plugin context and standard imports are omitted where noted.
export const examples = [
  {
    "id": "integer",
    "project": "Commons",
    "filename": "NumberUtils.java",
    "label": "NumberUtils",
    "href": "./commons/dev/despical/commons/number/NumberUtils.html",
    "code": "import dev.despical.commons\n    .number.NumberUtils;\n\n// Validate numeric input.\nboolean valid = NumberUtils\n    .isInteger(\"42\");",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/number/NumberUtils.java"
  },
  {
    "id": "parse-default",
    "project": "Commons",
    "filename": "NumberUtils.java",
    "label": "NumberUtils",
    "href": "./commons/dev/despical/commons/number/NumberUtils.html",
    "code": "import dev.despical.commons\n    .number.NumberUtils;\n\n// Fall back when parsing fails.\nint limit = NumberUtils.getInt(\"oops\", 10);\ndouble price = NumberUtils\n    .getDouble(\"12.50\", 0.0);",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/number/NumberUtils.java"
  },
  {
    "id": "range",
    "project": "Commons",
    "filename": "NumberUtils.java",
    "label": "NumberUtils",
    "href": "./commons/dev/despical/commons/number/NumberUtils.html",
    "code": "import dev.despical.commons\n    .number.NumberUtils;\n\n// Check an inclusive range.\nint level = 12;\nboolean allowed = NumberUtils\n    .isBetween(level, 1, 20);",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/number/NumberUtils.java"
  },
  {
    "id": "capitalize",
    "project": "Commons",
    "filename": "StringUtils.java",
    "label": "StringUtils",
    "href": "./commons/dev/despical/commons/string/StringUtils.html",
    "code": "import dev.despical.commons\n    .string.StringUtils;\n\n// Capitalize words separated by spaces.\nString title = StringUtils\n    .capitalize(\"hello world\", ' ');\n// Hello World",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/string/StringUtils.java"
  },
  {
    "id": "item-builder",
    "project": "Commons",
    "filename": "ItemBuilder.java",
    "label": "ItemBuilder",
    "href": "./commons/dev/despical/commons/item/ItemBuilder.html",
    "code": "// Build a named item with lore.\nItemStack item = new ItemBuilder(Material.BOOK)\n    .name(\"Guide\")\n    .lore(\"Everything you need to know.\")\n    .amount(1)\n    .build();",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/item/ItemBuilder.java"
  },
  {
    "id": "location",
    "project": "Commons",
    "filename": "LocationSerializer.java",
    "label": "LocationSerializer",
    "href": "./commons/dev/despical/commons/serializer/LocationSerializer.html",
    "code": "// Keep a player's location as a string.\nString saved = LocationSerializer\n    .toString(player.getLocation());\n\n// Restore it when you need it.\nLocation restored = LocationSerializer\n    .fromString(saved);",
    "source": "https://github.com/Despical/Commons/blob/master/src/main/java/dev/despical/commons/serializer/LocationSerializer.java"
  },
  {
    "id": "menu",
    "project": "InventoryFramework",
    "filename": "Gui.java",
    "label": "Gui",
    "href": "./inventory-framework/dev/despical/inventoryframework/Gui.html",
    "code": "// Use your plugin and player instances.\nGui menu = new Gui(plugin, 3, \"Menu\");\n\n// Keep items inside the menu.\nmenu.setOnGlobalClick(event ->\n    event.setCancelled(true));\nmenu.show(player);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/Gui.java"
  },
  {
    "id": "gui-builder",
    "project": "InventoryFramework",
    "filename": "GuiBuilder.java",
    "label": "GuiBuilder",
    "href": "./inventory-framework/dev/despical/inventoryframework/GuiBuilder.html",
    "code": "// Build and show a three-row menu.\nnew GuiBuilder(plugin)\n    .rows(3)\n    .title(\"Your collection\")\n    .globalClick(event ->\n        event.setCancelled(true))\n    .show(player);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/GuiBuilder.java"
  },
  {
    "id": "positioned-item",
    "project": "InventoryFramework",
    "filename": "StaticPane.java",
    "label": "StaticPane",
    "href": "./inventory-framework/dev/despical/inventoryframework/pane/StaticPane.html",
    "code": "// Place an item at a specific position.\nStaticPane pane = new StaticPane(0, 0, 9, 3);\nGuiItem book = new GuiItem(\n    new ItemStack(Material.BOOK));\n\npane.addItem(book, 4, 1);\nmenu.addPane(pane);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/pane/StaticPane.java"
  },
  {
    "id": "outline",
    "project": "InventoryFramework",
    "filename": "OutlinePane.java",
    "label": "OutlinePane",
    "href": "./inventory-framework/dev/despical/inventoryframework/pane/OutlinePane.html",
    "code": "// Repeat an item across a row.\nOutlinePane row = new OutlinePane(0, 0, 9, 1);\nrow.addItem(new GuiItem(\n    new ItemStack(Material.PAPER)));\nrow.setRepeat(true);\nmenu.addPane(row);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/pane/OutlinePane.java"
  },
  {
    "id": "pagination",
    "project": "InventoryFramework",
    "filename": "PaginatedPane.java",
    "label": "PaginatedPane",
    "href": "./inventory-framework/dev/despical/inventoryframework/pane/PaginatedPane.html",
    "code": "// items is a List<ItemStack>.\nPaginatedPane pages =\n    new PaginatedPane(0, 0, 9, 3);\npages.populateWithItemStacks(items);\npages.setPage(0);\n\nmenu.addPane(pages);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/pane/PaginatedPane.java"
  },
  {
    "id": "click-handler",
    "project": "InventoryFramework",
    "filename": "GuiItem.java",
    "label": "GuiItem",
    "href": "./inventory-framework/dev/despical/inventoryframework/GuiItem.html",
    "code": "// Give an item its own click handler.\nGuiItem button = new GuiItem(\n    new ItemStack(Material.EMERALD),\n    event -> {\n        event.setCancelled(true);\n        player.sendMessage(\"Selected!\");\n    });",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/GuiItem.java"
  },
  {
    "id": "menu-border",
    "project": "InventoryFramework",
    "filename": "StaticPane.java",
    "label": "StaticPane",
    "href": "./inventory-framework/dev/despical/inventoryframework/pane/StaticPane.html",
    "code": "// Frame a menu with a glass border.\nStaticPane frame = new StaticPane(0, 0, 9, 3);\nGuiItem glass = new GuiItem(new ItemStack(\n    Material.GRAY_STAINED_GLASS_PANE));\n\nframe.fillBorder(glass);\nmenu.addPane(frame);",
    "source": "https://github.com/Despical/InventoryFramework/blob/main/src/main/java/dev/despical/inventoryframework/pane/StaticPane.java"
  },
  {
    "id": "register",
    "project": "CommandFramework",
    "filename": "CommandFramework.java",
    "label": "CommandFramework",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/CommandFramework.html",
    "code": "// Inside your JavaPlugin class.\n@Override\npublic void onEnable() {\n    CommandFramework commands =\n        new CommandFramework(this);\n    commands.registerCommands(this);\n}",
    "source": "https://github.com/Despical/CommandFramework/blob/master/README.md"
  },
  {
    "id": "simple-command",
    "project": "CommandFramework",
    "filename": "Command.java",
    "label": "Command",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/annotations/Command.html",
    "code": "// Register the containing class first.\n@Command(name = \"hello\", aliases = {\"hi\"})\npublic void hello(CommandArguments args) {\n    args.sendMessage(\"Hello there!\");\n}",
    "source": "https://github.com/Despical/CommandFramework/blob/master/README.md"
  },
  {
    "id": "subcommand",
    "project": "CommandFramework",
    "filename": "Command.java",
    "label": "Command",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/annotations/Command.html",
    "code": "// Handles /arena info.\n@Command(name = \"arena.info\")\npublic void info(CommandArguments args) {\n    args.sendMessage(\"Arena information\");\n}",
    "source": "https://docs.despical.dev/command-framework/examples/#creating-sub-commands"
  },
  {
    "id": "permissions",
    "project": "CommandFramework",
    "filename": "Command.java",
    "label": "Command",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/annotations/Command.html",
    "code": "// Permissions are checked automatically.\n@Command(name = \"admin\",\n    permission = \"myplugin.admin\")\npublic void admin(CommandArguments args) {\n    args.sendMessage(\"Access granted.\");\n}",
    "source": "https://github.com/Despical/CommandFramework/blob/master/README.md"
  },
  {
    "id": "completion",
    "project": "CommandFramework",
    "filename": "Completer.java",
    "label": "Completer",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/annotations/Completer.html",
    "code": "// Suggest arguments for /arena.\n@Completer(name = \"arena\")\npublic List<String> complete() {\n    return List.of(\"join\", \"leave\", \"info\");\n}",
    "source": "https://docs.despical.dev/command-framework/examples/#creating-tab-completions"
  },
  {
    "id": "cooldown",
    "project": "CommandFramework",
    "filename": "Cooldown.java",
    "label": "Cooldown",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/annotations/Cooldown.html",
    "code": "// Allow one use every ten seconds.\n@Command(name = \"ping\")\n@Cooldown(value = 10)\npublic void ping(CommandArguments args) {\n    args.sendMessage(\"Pong!\");\n}",
    "source": "https://github.com/Despical/CommandFramework/blob/master/README.md"
  },
  {
    "id": "argument",
    "project": "CommandFramework",
    "filename": "CommandArguments.java",
    "label": "CommandArguments",
    "href": "./command-framework/dev.despical.commandframework/dev/despical/commandframework/CommandArguments.html",
    "code": "// Require one argument before execution.\n@Command(name = \"greet\", min = 1)\npublic void greet(CommandArguments args) {\n    String name = args.getArgument(0);\n    args.sendMessage(\"Hello, \" + name);\n}",
    "source": "https://github.com/Despical/CommandFramework/blob/master/README.md"
  }
];

// Skip the previous entry while retaining a uniform choice among the others.
export function pickExampleIndex(previous, random) {
    const prior = previous === null ? NaN : Number(previous);
    const hasPrevious = Number.isInteger(prior) && prior >= 0 && prior < examples.length;
    const size = examples.length - (hasPrevious ? 1 : 0);
    const selected = Math.min(size - 1, Math.floor(Math.max(0, random) * size));
    return hasPrevious && selected >= prior ? selected + 1 : selected;
}
