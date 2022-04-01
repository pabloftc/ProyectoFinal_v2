"""empty message

Revision ID: 0d4329f042a0
Revises: 
Create Date: 2022-03-30 23:29:47.634897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0d4329f042a0'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('rol', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('curso',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=300), nullable=True),
    sa.Column('descripcion', sa.String(length=600), nullable=True),
    sa.Column('categoria', sa.String(length=80), nullable=True),
    sa.Column('url', sa.String(length=300), nullable=True),
    sa.Column('url_portada', sa.String(length=300), nullable=True),
    sa.Column('precio', sa.Integer(), nullable=True),
    sa.Column('duracion', sa.String(length=250), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pedidos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('precio_total', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('metodo_de_pago', sa.Integer(), nullable=True),
    sa.Column('curso_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['curso_id'], ['curso.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pedidos')
    op.drop_table('curso')
    op.drop_table('user')
    # ### end Alembic commands ###
