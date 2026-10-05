/**
 * Prod settings registry body — executed via `new Function(...)` from ResourceLoader.
 * Channel deltas (like CssBundle): `defaultSettings.beta.js` / `defaultSettings.dev.js`.
 */

registerCategory("settings.category_inventory")
registerSetting({
	id: "collector",
	langKey: "settings.collector",
	defaultValue: true,
})
registerSetting({
	id: "collector_sell",
	langKey: "settings.collector_sell",
	defaultValue: true,
})
registerSetting({
	id: "pin_items",
	langKey: "settings.pin_items",
	defaultValue: true,
})
registerSetting({
	id: "inventory_highlighter",
	langKey: "settings.inventory_highlighter",
	defaultValue: false,
})
registerSetting({
	id: "clothcache_itemusageinfo",
	langKey: "settings.clothcache_itemusageinfo",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "equip_manager_plus",
	langKey: "settings.equip_manager_plus",
	defaultValue: true,
})
registerSetting({
	id: "item_tooltip_v2",
	langKey: "settings.item_tooltip_v2",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "item_tooltip_set_column",
	langKey: "settings.item_tooltip_set_column",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_set_event",
	langKey: "settings.item_tooltip_set_event",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_owned_count",
	langKey: "settings.item_tooltip_owned_count",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_craft_table",
	langKey: "settings.item_tooltip_craft_table",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_recipe_table",
	langKey: "settings.item_tooltip_recipe_table",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_job_table",
	langKey: "settings.item_tooltip_job_table",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_quest_job_table",
	langKey: "settings.item_tooltip_quest_job_table",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_weapon_avg",
	langKey: "settings.item_tooltip_weapon_avg",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_usebonus_calc",
	langKey: "settings.item_tooltip_usebonus_calc",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_item_id",
	langKey: "settings.item_tooltip_item_id",
	defaultValue: false,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_trader_level",
	langKey: "settings.item_tooltip_trader_level",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerSetting({
	id: "item_tooltip_min_market_price",
	langKey: "settings.item_tooltip_min_market_price",
	defaultValue: true,
	apply: "instant",
	groupLangKey: "settings.item_tooltip_group",
})
registerCategory("settings.category_quests")
registerSetting({
	id: "quest_cancel",
	langKey: "settings.quest_cancel",
	defaultValue: true,
})
registerSetting({
	id: "instant_quest",
	langKey: "settings.instant_quest",
	defaultValue: false,
})
registerSetting({
	id: "colored_quest",
	langKey: "settings.colored_quest",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "employer_speed_set",
	langKey: "settings.employer_speed_set",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "smart_speed_set",
	langKey: "settings.smart_speed_set",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "questgroup_show_intro",
	langKey: "settings.questgroup_show_intro",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "solved_quest_search",
	langKey: "settings.solved_quest_search",
	defaultValue: true,
})
registerSetting({
	id: "quest_tracker_warning",
	langKey: "settings.quest_tracker_warning",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "quest_util_kb_link",
	langKey: "settings.quest_util_kb_link",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
})
registerSetting({
	id: "quest_util_craft",
	langKey: "settings.quest_util_craft",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "quest_util_market",
	langKey: "settings.quest_util_market",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "quest_util_shop",
	langKey: "settings.quest_util_shop",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "quest_util_wear",
	langKey: "settings.quest_util_wear",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "quest_util_itemcount",
	langKey: "settings.quest_util_itemcount",
	groupLangKey: "settings.quest_util_group",
	defaultValue: false,
	apply: "instant",
})
registerCategory("settings.category_jobs")
registerSetting({
	id: "map_job_owned_count",
	langKey: "settings.map_job_owned_count",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "job_queue_bar_offset",
	langKey: "settings.job_queue_bar_offset",
	defaultValue: true,
})
registerSetting({
	id: "job_show_lp",
	langKey: "settings.job_lp",
	defaultValue: true,
})
registerSetting({
	id: "job_show_collectibles",
	langKey: "settings.job_show_collectibles",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "job_show_luck",
	langKey: "settings.job_show_luck",
	defaultValue: false,
})
registerSetting({
	id: "no_jobgroup_animation",
	langKey: "settings.no_jobgroup_animation",
	defaultValue: false,
	apply: "instant",
})
registerCategory("settings.category_task_list")
registerSetting({
	id: "task_list_points",
	langKey: "settings.task_points",
	defaultValue: true,
})
registerSetting({
	id: "taskqueue_logs",
	langKey: "settings.taskqueue_logs",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "taskqueue_logs_demo",
	langKey: "settings.taskqueue_logs_demo",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "daily_tasks_warning",
	langKey: "settings.daily_tasks_warning",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "taskqueue_length_in_favicon",
	langKey: "settings.taskqueue_length_in_favicon",
	groupLangKey: "settings.taskqueue_favicon",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "taskqueue_idle_in_favicon",
	langKey: "settings.taskqueue_idle_in_favicon",
	groupLangKey: "settings.taskqueue_favicon",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "taskqueue_sleep_in_favicon",
	langKey: "settings.taskqueue_sleep_in_favicon",
	groupLangKey: "settings.taskqueue_favicon",
	defaultValue: false,
	apply: "instant",
})
registerCategory("settings.category_fort")
registerSetting({
	id: "import_westforts",
	langKey: "settings.forts_import",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_recruitment",
	langKey: "settings.fortbattle_recruitment",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_enhanced_recruitment",
	langKey: "settings.fortbattle_enhanced_recruitment",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "fortbattle_player_icons",
	langKey: "settings.fortbattle_player_icons",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_better_control_buttons",
	langKey: "settings.fortbattle_better_control_buttons",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_chat_topic",
	langKey: "settings.fortbattle_chat_topic",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_prebattle_center",
	langKey: "settings.fortbattle_prebattle_center",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "clothcache_recruiting_window",
	langKey: "settings.clothcache_recruiting_window",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "fortbattle_declare_reports",
	langKey: "settings.fortbattle_declare_reports",
	defaultValue: true,
})
registerSetting({
	id: "owned_forts_tab",
	langKey: "settings.forts_owned",
	defaultValue: false,
})
registerSetting({
	id: "fortbattle_cemetery_criticals",
	langKey: "settings.fortbattle_cemetery_criticals",
	defaultValue: false,
})
registerSetting({
	id: "fortbattle_total_dmg",
	langKey: "settings.fortbattle_total_dmg",
	defaultValue: false,
})
registerSetting({
	id: "fortbattle_round_info",
	langKey: "settings.fortbattle_round_info",
	defaultValue: false,
})
registerSetting({
	id: "fortbattle_player_colors",
	langKey: "settings.fortbattle_player_colors",
	defaultValue: false,
})
registerSetting({
	id: "chat_fort_alt_roster_completion",
	langKey: "settings.chat_fort_alt_roster_completion",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "fixGraveyardtable",
	langKey: "settings.fix_graveyardtable",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "fortbattle_chat_health",
	langKey: "settings.fortbattle_chat_health",
	defaultValue: false,
})
registerSetting({
	id: "fortbattle_popup_move",
	langKey: "settings.fortbattle_popup_move",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_popup",
	langKey: "settings.fortbattle_popup",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "active_fortbattle_count",
	langKey: "settings.active_fortbattle_count",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_waytime",
	langKey: "settings.fortbattle_waytime",
	defaultValue: true,
})
registerSetting({
	id: "fortbattle_reminder",
	langKey: "settings.fortbattle_reminder",
	defaultValue: false,
})
registerCategory("settings.category_town")
registerSetting({
	id: "city_travel_time",
	langKey: "settings.city_travel_time",
	defaultValue: true,
})
registerSetting({
	id: "building_progress",
	langKey: "settings.building_progress",
	defaultValue: true,
})
registerSetting({
	id: "church_levels",
	langKey: "settings.church_levels",
	defaultValue: true,
})
registerSetting({
	id: "improved_cityhall_tab",
	langKey: "settings.improved_cityhall_tab",
	defaultValue: true,
})
registerSetting({
	id: "townwindow_alliance",
	langKey: "settings.townwindow_alliance",
	defaultValue: true,
})
registerSetting({
	id: "town_shop_pages",
	langKey: "settings.town_shop_pages",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "town_shop_collect_switch",
	langKey: "settings.town_shop_collect_switch",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "town_shop_search",
	langKey: "settings.town_shop_search",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "town_forum_blink",
	langKey: "settings.forum_blink",
	defaultValue: false,
})
registerSetting({
	id: "forum_select",
	langKey: "settings.forum_select",
	defaultValue: true,
})
registerSetting({
	id: "misc_sheriff_minbounty",
	langKey: "settings.misc_sheriff_minbounty",
	defaultValue: false,
})
registerCategory("settings.category_market")
registerSetting({
	id: "market_map",
	langKey: "settings.market_map",
	defaultValue: false,
})
registerSetting({
	id: "market_reminder",
	langKey: "settings.market_reminder",
	defaultValue: true,
})
registerSetting({
	id: "market_offer_category_memory",
	langKey: "settings.market_offer_category_memory",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "market_sell_dialog",
	langKey: "settings.market_sell",
	defaultValue: true,
})
registerSetting({
	id: "trader_multi_sell",
	langKey: "settings.trader_multi_sell",
	defaultValue: true,
})
registerSetting({
	id: "market_sellstat",
	langKey: "settings.market_sellstat",
	defaultValue: true,
})
registerSetting({
	id: "market_offerstat",
	langKey: "settings.market_offerstat",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "market_report",
	langKey: "settings.market_report",
	defaultValue: true,
})
registerSetting({
	id: "improved_market",
	langKey: "settings.market_improved",
	defaultValue: false,
})
registerCategory("settings.category_minimap")
registerSetting({
	id: "bonus_jobs",
	langKey: "settings.bonus_jobs",
	defaultValue: true,
})
registerSetting({
	id: "coordinates_input",
	langKey: "settings.coordinates_input",
	defaultValue: true,
})
registerSetting({
	id: "minimap_shortcuts",
	langKey: "settings.minimap_shortcuts",
	defaultValue: false,
})
registerSetting({
	id: "minimap_nearest_job_center",
	langKey: "settings.minimap_nearest_job_center",
	defaultValue: true,
})
registerCategory("settings.category_chat")
registerSetting({
	id: "chat",
	langKey: "settings.chat",
	defaultValue: true,
})
registerSetting({
	id: "chat_profession_icons",
	langKey: "settings.chat_profession_icons",
	defaultValue: true,
})
registerSetting({
	id: "mini_chat",
	langKey: "settings.mini_chat",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_room_highlight",
	langKey: "settings.chat_room_highlight",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_room_highlight_text",
	langKey: "settings.chat_room_highlight_text",
	mode: "string",
	defaultValue: "",
	apply: "instant",
	fieldFirst: true,
})
registerSetting({
	id: "chat_show_stranger_presence",
	langKey: "settings.chat_show_stranger_presence",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "whisper_improved",
	langKey: "settings.whisper_improved",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "chat_room_slash_active",
	langKey: "settings.chat_room_slash_active",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_room_slash_ping",
	langKey: "settings.chat_room_slash_ping",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_fort_slash_swap",
	langKey: "settings.chat_fort_slash_swap",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_fort_slash_swap_english_second_line",
	langKey: "settings.chat_fort_slash_swap_english_second_line",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "chat_fort_slash_find",
	langKey: "settings.chat_fort_slash_find",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_fort_slash_mark",
	langKey: "settings.chat_fort_slash_mark",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_room_slash_colorful",
	langKey: "settings.chat_room_slash_colorful",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "chat_room_slash_color_strip",
	langKey: "settings.chat_room_slash_color_strip",
	groupLangKey: "settings.chat_slash_commands",
	defaultValue: false,
	apply: "instant",
})
registerCategory("settings.category_premium")
registerSetting({
	id: "work_queue_off",
	langKey: "settings.work_queue_off",
	defaultValue: true,
})
registerSetting({
	id: "energy_prem_off",
	langKey: "settings.energy_prem_off",
	defaultValue: true,
})
registerSetting({
	id: "fetch_all_off",
	langKey: "settings.fetch_all_off",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "wof_nuggets_off",
	langKey: "settings.wof_nuggets_off",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "vipendtime_show",
	langKey: "settings.vipendtime_show",
	defaultValue: false,
})
registerCategory("settings.category_messages_tabs")
registerSetting({
	id: "job_analyzer",
	langKey: "settings.job_analyzer",
	defaultValue: true,
})
registerSetting({
	id: "duel_analyzer",
	langKey: "settings.duel_analyzer",
	defaultValue: true,
})
registerSetting({
	id: "chest_analyzer",
	langKey: "settings.chest_analyzer",
	defaultValue: true,
})
registerSetting({
	id: "notes",
	langKey: "settings.notes",
	defaultValue: true,
})
registerSetting({
	id: "enhance_telegrams",
	langKey: "settings.enhance_telegrams",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "telegram_bb_codes",
	langKey: "settings.telegram_bb_codes",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "read_all_telegrams",
	langKey: "settings.read_all_telegrams",
	defaultValue: true,
	apply: "instant",
})
registerSetting({
	id: "unread_telegrams_highlight",
	langKey: "settings.unread_telegrams_highlight",
	defaultValue: false,
	apply: "instant",
})
registerCategory("settings.category_misc")
registerSetting({
	id: "hide_completed_achievements",
	langKey: "settings.hide_completed_achievements",
	defaultValue: true,
})
registerSetting({
	id: "achievement_collections_tab",
	langKey: "settings.achievement_collections_tab",
	defaultValue: true,
})
registerSetting({
	id: "userscripts_menubar",
	langKey: "settings.userscripts_menubar",
	defaultValue: true,
})
registerSetting({
	id: "work_notifications_clear",
	langKey: "settings.work_notifications_clear",
	defaultValue: true,
})
registerSetting({
	id: "event_currency_click_send_all",
	langKey: "settings.event_currency_click_send_all",
	defaultValue: true,
})
registerSetting({
	id: "auto_deposit",
	langKey: "settings.auto_deposit",
	defaultValue: false,
})
registerSetting({
	id: "weekly_crafting",
	langKey: "settings.weekly_crafting",
	defaultValue: true,
})
registerSetting({
	id: "enhanced_rankings",
	langKey: "settings.enhanced_rankings",
	defaultValue: true,
})
registerSetting({
	id: "translation_texts",
	langKey: "settings.translation_texts",
	defaultValue: true,
})
registerSetting({
	id: "friendslist_window_info",
	langKey: "settings.friendslist_window_info",
	defaultValue: true,
})
registerSetting({
	id: "wof_oktoberfest_speedup",
	langKey: "settings.wof_oktoberfest_speedup",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "click_profile_for_description",
	langKey: "settings.click_profile_for_description",
	defaultValue: false,
})
registerCategory("settings.category_graphics")
registerSetting({
	id: "duel_motivation",
	langKey: "settings.duel_motivation",
	defaultValue: false,
})
registerSetting({
	id: "direct_sleep",
	langKey: "settings.sleep_direct",
	defaultValue: true,
})
registerSetting({
	id: "deposit",
	langKey: "settings.deposit",
	defaultValue: true,
})
registerSetting({
	id: "no_shop_sale",
	langKey: "settings.shop_sale_off",
	defaultValue: false,
})
registerSetting({
	id: "notifications_max_count",
	langKey: "settings.notifications_max_count",
	mode: "int",
	defaultValue: 4,
	fieldFirst: true,
	min: 2,
	max: 8,
	apply: "instant",
})
registerSetting({
	id: "exp_bar",
	langKey: "settings.exp_bar",
	defaultValue: true,
})
registerSetting({
	id: "custom_event_counter",
	langKey: "settings.event_counter",
	defaultValue: true,
})
registerSetting({
	id: "scrollbars_off",
	langKey: "settings.scrollbars_off",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "wear_close",
	langKey: "settings.wear_close",
	defaultValue: true,
})
registerSetting({
	id: "esc_close_window",
	langKey: "settings.esc_close_window",
	defaultValue: true,
})
registerSetting({
	id: "profile_duel_exp",
	langKey: "settings.profile_duel_exp",
	defaultValue: false,
})
registerSetting({
	id: "friendrequest_counter",
	langKey: "settings.friendrequest_counter",
	defaultValue: true,
})
registerSetting({
	id: "profile_craft_points",
	langKey: "settings.profile_craft_points",
	defaultValue: false,
})
registerSetting({
	id: "regen_timers",
	langKey: "settings.regen_timers",
	defaultValue: true,
})
registerSetting({
	id: "move_avatar_notibar",
	langKey: "settings.move_avatar_notibar",
	defaultValue: false,
})
registerSetting({
	id: "pin_important",
	langKey: "settings.pin_important",
	defaultValue: true,
})
registerSetting({
	id: "blink_events",
	langKey: "settings.blink_events",
	defaultValue: false,
})
registerSetting({
	id: "button_church",
	langKey: "settings.button_church",
	groupLangKey: "settings.automation_buttons",
	defaultValue: false,
})
registerSetting({
	id: "button_market",
	langKey: "settings.button_market",
	groupLangKey: "settings.automation_buttons",
	defaultValue: false,
})
registerSetting({
	id: "alliance_world_map",
	langKey: "settings.alliance_world_map",
	groupLangKey: "settings.automation_buttons",
	defaultValue: true,
})
registerSetting({
	id: "shop_search",
	langKey: "settings.shop_search",
	groupLangKey: "settings.automation_buttons",
	defaultValue: true,
})
registerSetting({
	id: "upshop_show_count",
	langKey: "settings.upshop_show_count",
	groupLangKey: "settings.shop_owned_count_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "town_shop_show_count",
	langKey: "settings.town_shop_show_count",
	groupLangKey: "settings.shop_owned_count_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "wof_rewards_count",
	langKey: "settings.wof_rewards_count",
	groupLangKey: "settings.shop_owned_count_group",
	defaultValue: false,
})
registerSetting({
	id: "night_mode",
	langKey: "settings.night_mode",
	groupLangKey: "settings.night_mode_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "night_mode_sites",
	langKey: "settings.night_mode_sites",
	groupLangKey: "settings.night_mode_group",
	defaultValue: false,
	apply: "instant",
})
registerSetting({
	id: "night_mode_brightness",
	langKey: "settings.night_mode_brightness",
	groupLangKey: "settings.night_mode_group",
	mode: "int",
	defaultValue: 80,
	fieldFirst: true,
	min: 0,
	max: 100,
	apply: "instant",
})
