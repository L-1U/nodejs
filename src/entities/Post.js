const { EntitySchema } = require('typeorm');

const Post = new EntitySchema({
    name: 'Post',
    tableName: 'posts',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        title: {
            type: 'varchar',
            length: 200,
        },
        content: {
            type: 'text',
            nullable: true,
        },
        user_id: {
            type: 'int',
        },
        created_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
        },
    },
    relations: {
        user: {
            target: 'User',
            type: 'many-to-one',
            joinColumn: {
                name: 'user_id',
            },
        },
    },
});

module.exports = { Post };
