import { TranslationMessages } from "react-admin";
import englishMessages from "ra-language-english";

const customEnglishMessages: TranslationMessages = {
  ...englishMessages,
  pos: {
    search: "Search",
    configuration: "Configuration",
    language: "Language",
    theme: {
      name: "Theme",
      light: "Light",
      dark: "Dark",
    },
    dashboard: {
      monthly_revenue: "Monthly Revenue",
      month_history: "30 Day Revenue History",
      projects_history: "New Users per/day",
      new_orders: "New Orders",
      pending_reviews: "Pending Reviews",
      all_reviews: "See all reviews",
      all_users: "See all users",
      new_users: "Total Users",
      new_customers: "New Customers",
      all_customers: "See all customers",
      new_genres: "Total Genres",
      all_genres: "See all genres",
      new_tracks: "Total Tracks",
      all_tracks: "See all tracks",
      new_projects: "Total Projects",
      all_projects: "See all Projects",
      pending_orders: "Pending Orders",
      home_screens: "Home Screens",
      order: {
        items:
          "by %{customer_name}, one item |||| by %{customer_name}, %{nb_items} items",
      },
      welcome: {
        title: "Welcome to the DJAMINN CMS Portal",
        subtitle:
          "A WORLD OF MUSIC ASKING FOR YOU · It takes courage to create – to express who you truly are · your tracks, be heard, collaborate, and create your own future.",
        ra_button: "DJAMINN WebSite",
        demo_button: "Djaminn App n Idea",
      },
    },
    menu: {
      sales: "Sales",
      catalog: "Catalog",
      customers: "Customers",
      genres: "Genres",
      playlists: "Playlists",
      musicalInstruments: "Instruments",
    },
  },
  resources: {
    customers: {
      name: "Customer |||| Customers",
      fields: {
        commands: "Orders",
        first_seen: "First seen",
        groups: "Segments",
        last_seen: "Last seen",
        last_seen_gte: "Visited Since",
        name: "Name",
        total_spent: "Total spent",
        password: "Password",
        confirm_password: "Confirm password",
        stateAbbr: "State",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
        this_week: "This week",
        last_week: "Last week",
        this_month: "This month",
        last_month: "Last month",
        earlier: "Earlier",
        has_ordered: "Has ordered",
        has_newsletter: "Has newsletter",
        group: "Segment",
      },
      fieldGroups: {
        identity: "Identity",
        address: "Address",
        stats: "Stats",
        history: "History",
        password: "Password",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete Customer",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
    },
    commands: {
      name: "Order |||| Orders",
      amount: "1 order |||| %{smart_count} orders",
      title: "Order %{reference}",
      fields: {
        basket: {
          delivery: "Delivery",
          reference: "Reference",
          quantity: "Quantity",
          sum: "Sum",
          tax_rate: "Tax Rate",
          taxes: "Tax",
          total: "Total",
          unit_price: "Unit Price",
        },
        address: "Address",
        customer_id: "Customer",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        nb_items: "Nb Items",
        total_gte: "Min amount",
        status: "Status",
        returned: "Returned",
      },
      section: {
        order: "Order",
        customer: "Customer",
        shipping_address: "Shipping Address",
        items: "Items",
        total: "Totals",
      },
    },
    invoices: {
      name: "Invoice |||| Invoices",
      fields: {
        date: "Invoice date",
        customer_id: "Customer",
        command_id: "Order",
        date_gte: "Passed Since",
        date_lte: "Passed Before",
        total_gte: "Min amount",
        address: "Address",
      },
    },
    products: {
      name: "Poster |||| Posters",
      fields: {
        category_id: "Category",
        height_gte: "Min height",
        height_lte: "Max height",
        height: "Height",
        image: "Image",
        price: "Price",
        reference: "Reference",
        sales: "Sales",
        stock_lte: "Low Stock",
        stock: "Stock",
        thumbnail: "Thumbnail",
        width_gte: "Min width",
        width_lte: "Max width",
        width: "Width",
      },
      tabs: {
        image: "Image",
        details: "Details",
        description: "Description",
        reviews: "Reviews",
      },
      filters: {
        categories: "Categories",
        stock: "Stock",
        no_stock: "Out of stock",
        low_stock: "1 - 9 items",
        average_stock: "10 - 49 items",
        enough_stock: "50 items & more",
        sales: "Sales",
        best_sellers: "Best sellers",
        average_sellers: "Average",
        low_sellers: "Low",
        never_sold: "Never sold",
      },
    },
    categories: {
      name: "Category |||| Categories",
      fields: {
        products: "Products",
      },
    },
    reviews: {
      name: "Review |||| Reviews",
      amount: "1 review |||| %{smart_count} reviews",
      relative_to_poster: "Review on poster",
      detail: "Review detail",
      fields: {
        customer_id: "Customer",
        command_id: "Order",
        product_id: "Product",
        date_gte: "Posted since",
        date_lte: "Posted before",
        date: "Date",
        comment: "Comment",
        rating: "Rating",
      },
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      notification: {
        approved_success: "Review approved",
        approved_error: "Error: Review not approved",
        rejected_success: "Review rejected",
        rejected_error: "Error: Review not rejected",
      },
    },
    segments: {
      name: "Segment |||| Segments",
      fields: {
        customers: "Customers",
        name: "Name",
      },
      data: {
        compulsive: "Compulsive",
        collector: "Collector",
        ordered_once: "Ordered once",
        regular: "Regular",
        returns: "Returns",
        reviewer: "Reviewer",
      },
    },
    users: {
      name: "User |||| Users",
      amount: "1 user |||| %{smart_count} users",
      relative_to_poster: "User on poster",
      detail: "User detail",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      fields: {
        created_at: "Created_at",
        email: "Email",
        name: "Name",
        role: "Role",
        artist: "Artist",
        avatar_url: "Avatar_url",
        device_model: "Device_Model",
        is_developer: "Is_Developer",
        password: "Password",
        useravatar: "User Avatar",
        changeuseravatar: "Change User Avatar or Select Random",
        headerimage: "Header Image",
        changeheaderimage: "Change Header Image",
      },
      filters: {
        last_visited: "Last visited",
        today: "Today",
        this_week: "This week",
        last_week: "Last week",
        this_month: "This month",
        last_month: "Last month",
        earlier: "Earlier",
        role: "Role",
        superadmin: "SuperAdmin",
        admin: "Admin",
        user: "User",
        anon: "Anon",
        qa: "QA",
        service: "Service",
        contentcreator: "Content Creator",
      },
      fieldGroups: {
        created_at: "Created_at",
        email: "Email",
        name: "Name",
        editUser: "Edit User",
        createUser: "Create User",
        role: "Role",
        avatar_url: "Avatar_url",
        device_model: "Device_Model",
        is_developer: "Is_Developer",
        change_password: "Change Password",
      },
      page: {
        delete: "Delete User",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
      notification: {
        approved_success: "User approved",
        approved_error: "Error: User not approved",
        rejected_success: "User rejected",
        rejected_error: "Error: User not rejected",
      },
    },
    musicalInstruments: {
      name: "Instrument |||| Instruments",
      fields: {
        name: "Name",
        Rank: "Rank",
        createdAt: "Created At",
      },
      filters: {
        name: "by Name",
        description: "Description",
        createdAt: "Created At",
      },
      fieldGroups: {
        name: "Name",
        rank: "Rank",
        createdAt: "Created At",
        editInstrument: "Edit Musical Instrument",
        createInstrument: "Create Musical Instrument",
      },
      page: {
        delete: "Delete Musical Instrument",
      },
    },
    genres: {
      name: "Genre |||| Genres",
      fields: {
        name: "Name",
        description: "Description",
        createdAt: "Created At",
        rank: "Rank",
      },
      filters: {
        name: "by Name",
        description: "Description",
        createdAt: "Created At",
      },
      fieldGroups: {
        name: "Name",
        description: "Description",
        createdAt: "Created At",
        editGenre: "Edit Genre",
        createGenre: "Create Genre",
        rank: "Rank",
      },
      page: {
        delete: "Delete Genre",
      },
    },
    effects: {
      name: "Effect |||| Effects",
      amount: "1 Effect |||| %{smart_count} Effects",
      relative_to_poster: "Effect on poster",
      detail: "Effect detail",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      fields: {
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        presets: "PreSets",
        owner: "Owner",
        data: "Data",
        private: "Private",
        edit: "Edit",
        typeOfEffect: "Type Of Effect",
        effectValues: "Effect Value",
      },
      filters: {
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        presets: "PreSets",
        owner: "Owner",
        data: "Data",
        private: "Private",
        edit: "Edit",
        typeOfEffect: "Type Of Effect",
        effectValues: "Effect Value",
        DELAYBPM: "DELAYBPM",
        DELAY: "DELAY",
        REVERB: "REVERB",
        EQUALIZER: "EQUALIZER",
        COMPRESSOR: "COMPRESSOR",
        COMPR_MASTERBUS: "COMPR..MASTERBUS",
        LIMITER: "LIMITER",
      },
      fieldGroups: {
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        presets: "PreSets",
        owner: "Owner",
        data: "Data",
        private: "Private",
        edit: "Edit",
        typeOfEffect: "typeOfEffect",
        effectValues: "Effect Value",
        CreateEffect: "Create Effect",
        EditEffect: "Edit Effect",
      },
      page: {
        delete: "Delete Effect",
      },
      errors: {},
      notification: {
        approved_success: "Effect approved",
        approved_error: "Error: Effect not approved",
        rejected_success: "Effect rejected",
        rejected_error: "Error: Effect not rejected",
      },
    },
    presets: {
      name: "Preset |||| Presets",
      amount: "1 Preset |||| %{smart_count} Presets",
      relative_to_poster: "Preset on poster",
      detail: "Preset detail",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      fields: {
        id: "Id",
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        effects: "Effects",
        owner: "Owner",
        data: "Data",
        private: "Private",
        category: "Category",
        edit: "Edit",
      },
      filters: {
        id: "Id",
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        effects: "Effects",
        owner: "Owner",
        data: "Data",
        private: "Private",
        category: "Category",
        edit: "Edit",
        preset: "Preset",
        GUITAR: "GUITAR",
        BASS: "BASS",
        DRAMM: "DRAMM",
        UKULELE: "UKULELE",
        MASTERBUS: "MASTERBUS",
      },
      fieldGroups: {
        id: "Id",
        created_at: "Created_at",
        name: "Name",
        imageUrl: "Image Url",
        user: "User",
        project: "Project",
        effects: "Effects",
        owner: "Owner",
        data: "Data",
        private: "Private",
        category: "Category",
        edit: "Edit",
        editPreset: "Edit Preset",
        createPreset: "Create Preset",
      },
      page: {
        delete: "Delete Preset",
      },
      errors: {},
      notification: {
        approved_success: "Preset approved",
        approved_error: "Error: Preset not approved",
        rejected_success: "Preset rejected",
        rejected_error: "Error: Preset not rejected",
      },
    },
    bpms: {
      name: "BPM / Tempo |||| BPM's / Tempo's",
      amount: "1 BPM |||| %{smart_count} BPM",
      relative_to_poster: "BPM on poster",
      detail: "BPM detail",
      action: {
        accept: "Accept",
        reject: "Reject",
      },
      fields: {
        id: "id",
        name: "Sample BPM's",
        created_at: "Created_at",
        description: "Description",
        value: "Value",
        mp3file: "Mp3 File",
        audiofile: "Audio File",
        changemp3file: "Change MP3 File",
        changeaudiofile: "Change Audio File",
        audiochanged: "Audio File Changed",
        mp3changed: "Mp3 File Changed",
        searchbyname: "Search By Name",
        searchbybpm: "Search By BPM",
        serialnumber: "Sr. ",
      },
      filters: {
        id: "id",
        created_at: "Created_at",
        description: "Description",
        value: "value",
      },
      fieldGroups: {
        id: "id",
        created_at: "Created_at",
        description: "Description",
        value: "value",
        CreateBpm: "CreateBpm",
        EditBpm: "EditBpm",
      },
      page: {
        delete: "Delete BPM",
      },
      errors: {
        password_mismatch:
          "The password confirmation is not the same as the password.",
      },
      notification: {
        approved_success: "BPM approved",
        approved_error: "Error: User not approved",
        rejected_success: "User rejected",
        rejected_error: "Error: User not rejected",
      },
    },
  },
};

export default customEnglishMessages;
