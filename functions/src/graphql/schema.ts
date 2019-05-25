import { gql } from 'apollo-server'

export const typeDefs = gql`
type DataSource {
    createAt: String
    dataSourceId: String
    dataSourceType: String
    displayName: String
    mqttProxy: mqtt
    options: String
    owner: String
    state: String
}

type mqtt {
    host: String
    password: String
    username: String
}

type Query {
    getDataSource (email: String!): [DataSource]
    getUserInfo (email: String!): String
    getEvents (dataSourceID: String!, limit: Int!): [String]!
    getActionEvents (dataSourceId: String!): [String]!
}

type Mutation {
    changeDataSource (dataSourceID: String!, displayName: String, owner: String): Boolean!
    addActionEvents (actionEvents: String!): Boolean!
    addUserInfo (userInfo: String!): Boolean! 
}
`;

/*
type Layout_t {
    h: Number
    i: Number
    isDraggable: Boolean
    isResizable: Boolean
    maxH: Number
    maxW: Number
    minH: Number
    minW: Number
    moved: Boolean
    static: Boolean
    w: Number
    x: Number
    y: Number
}

type Settings_t {
    channel: String
    chartType: String
    dataSource: String
}

type Widget_t {
    settings: Settings_t
    type: String
}

type Grids_t {
    layout: Layout_t
    name: String
    tabIndex: Number
    widget: Widget_t
}

type Tabs_t {
    index: Number
    label: String
}

type userInfo {
    grids: [Grids_t]
    tabs: [Tabs_t]
}
*/