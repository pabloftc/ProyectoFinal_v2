"""empty message

Revision ID: 5bcab16f3a5e
Revises: 6baa3d5ac1cc
Create Date: 2022-04-09 00:25:22.397507

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5bcab16f3a5e'
down_revision = '6baa3d5ac1cc'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('cursos', 'name',
               existing_type=sa.VARCHAR(length=300),
               nullable=False)
    op.alter_column('cursos', 'description',
               existing_type=sa.VARCHAR(length=600),
               nullable=False)
    op.alter_column('cursos', 'categoria',
               existing_type=sa.VARCHAR(length=80),
               nullable=False)
    op.alter_column('cursos', 'precio',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.add_column('pedidos', sa.Column('curso_id', sa.Integer(), nullable=True))
    op.add_column('pedidos', sa.Column('user_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'pedidos', 'cursos', ['curso_id'], ['id'])
    op.create_foreign_key(None, 'pedidos', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'pedidos', type_='foreignkey')
    op.drop_constraint(None, 'pedidos', type_='foreignkey')
    op.drop_column('pedidos', 'user_id')
    op.drop_column('pedidos', 'curso_id')
    op.alter_column('cursos', 'precio',
               existing_type=sa.INTEGER(),
               nullable=True)
    op.alter_column('cursos', 'categoria',
               existing_type=sa.VARCHAR(length=80),
               nullable=True)
    op.alter_column('cursos', 'description',
               existing_type=sa.VARCHAR(length=600),
               nullable=True)
    op.alter_column('cursos', 'name',
               existing_type=sa.VARCHAR(length=300),
               nullable=True)
    # ### end Alembic commands ###
