
CREATE SEQUENCE public.usuario_id_seq;

CREATE TABLE public.usuario (
                id INTEGER NOT NULL DEFAULT nextval('public.usuario_id_seq'),
                uid VARCHAR NOT NULL,
                papel INTEGER NOT NULL,
                nome VARCHAR NOT NULL,
                email VARCHAR NOT NULL,
                CONSTRAINT usuario_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;

CREATE SEQUENCE public.produto_id_seq;

CREATE TABLE public.produto (
                id INTEGER NOT NULL DEFAULT nextval('public.produto_id_seq'),
                nome VARCHAR NOT NULL,
                descricao VARCHAR,
                valor_base DOUBLE PRECISION,
                codigo VARCHAR NOT NULL,
                CONSTRAINT produto_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.produto_id_seq OWNED BY public.produto.id;

CREATE SEQUENCE public.variacao_id_seq;

CREATE TABLE public.variacao (
                id INTEGER NOT NULL DEFAULT nextval('public.variacao_id_seq'),
                descricao VARCHAR NOT NULL,
                id_produto INTEGER NOT NULL,
                CONSTRAINT variacao_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.variacao_id_seq OWNED BY public.variacao.id;

CREATE SEQUENCE public.alternativa_id_seq;

CREATE TABLE public.alternativa (
                id INTEGER NOT NULL DEFAULT nextval('public.alternativa_id_seq'),
                nome VARCHAR NOT NULL,
                codigo VARCHAR NOT NULL,
                quantidade INTEGER NOT NULL,
                id_variacao INTEGER NOT NULL,
                valor DOUBLE PRECISION NOT NULL,
                CONSTRAINT alternativa_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.alternativa_id_seq OWNED BY public.alternativa.id;

ALTER TABLE public.variacao ADD CONSTRAINT produto_variacao_fk
FOREIGN KEY (id_produto)
REFERENCES public.produto (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.alternativa ADD CONSTRAINT variacao_alternativa_fk
FOREIGN KEY (id_variacao)
REFERENCES public.variacao (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;