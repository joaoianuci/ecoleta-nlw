import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    return knex.schema.createTable('points', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.string('email').notNullable().unique();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        table.float('latitude', 6).notNullable();
        table.float('longitude', 6).notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    return knex.schema.dropTable('points');
}

