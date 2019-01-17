<template>
	<div class="editor">
		<!-- <editor-menu-bar :editor="editor">
			<div class="menubar py-3" slot-scope="{ commands, isActive }">

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.bold() }"
					@click="commands.bold"
				>
					<i class="fas fa-bold"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.italic() }"
					@click="commands.italic"
				>
					<i class="fas fa-italic"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.strike() }"
					@click="commands.strike"
				>
					<i class="fas fa-strikethrough"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.underline() }"
					@click="commands.underline"
				>
					<i class="fas fa-underline"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.code() }"
					@click="commands.code"
				>
					<>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.paragraph() }"
					@click="commands.paragraph"
				>
					<i class="fas fa-paragraph"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 1 }) }"
					@click="commands.heading({ level: 1 })"
				>
					<strong>H1</strong>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 2 }) }"
					@click="commands.heading({ level: 2 })"
				>
					<strong>H2</strong>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.heading({ level: 3 }) }"
					@click="commands.heading({ level: 3 })"
				>
					<strong>H3</strong>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.bullet_list() }"
					@click="commands.bullet_list"
				>
					<i class="fas fa-list-ul"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.ordered_list() }"
					@click="commands.ordered_list"
				>
					<i class="fas fa-list-ol"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.blockquote() }"
					@click="commands.blockquote"
				>
					<i class="fas fa-quote-left"></i>
				</button>

				<button
					class="menubar__button"
					:class="{ 'is-active': isActive.code_block() }"
					@click="commands.code_block"
				>
					<i class="fas fa-code"></i>
				</button>

				<button
					class="menubar__button"
					@click="commands.undo"
				>
					<i class="fas fa-undo"></i>
				</button>

				<button
					class="menubar__button"
					@click="commands.redo"
				>
					<i class="fas fa-redo"></i>
				</button>

			</div>
		</editor-menu-bar> -->

		<!-- Floating Bar -->
    <editor-floating-menu :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="editor__floating-menu"
        :class="{ 'is-active': menu.isActive }"
        :style="`top: ${menu.top}px`"
      >

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 1 }) }"
          @click="commands.heading({ level: 1 })"
        >
          <strong>H1</strong>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          <strong>H2</strong>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          <strong>H3</strong>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <i class="fas fa-list-ul"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <i class="fas fa-list-ol"></i>
        </button>

        <button
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <i class="fas fa-quote-left"></i>
        </button>

        <!-- <button
          class="menubar__button"
          :class="{ 'is-active': isActive.code_block() }"
          @click="commands.code_block"
        >
          <i class="fas fa-code"></i>
        </button> -->

      </div>
    </editor-floating-menu>

    <!-- Menu Bubble -->
    <editor-menu-bubble :editor="editor">
      <div
        slot-scope="{ commands, isActive, getMarkAttrs, menu }"
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="fas fa-bold"></i>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="fas fa-italic"></i>
        </button>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="fas fa-underline"></i>
        </button>

        <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
          <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
          <button class="menububble__button" @click="setLinkUrl(commands.link, null)" type="button">
            <i class="fas fa-times"></i>
          </button>
        </form>

        <template v-else>
          <button
            class="menububble__button d-flex align-items-center"
            @click="showLinkMenu(getMarkAttrs('link'))"
            :class="{ 'is-active': isActive.link() }"
          >
            <span style="font-size: 1rem;">Add Link&nbsp;</span>
            <i class="fas fa-link"></i>
          </button>
        </template>

        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          <i class="fas fa-code"></i>
        </button>

      </div>
    </editor-menu-bubble>

		<editor-content class="editor__content" :editor="editor" />
	</div>
</template>

<script>
import { Editor, EditorContent, EditorFloatingMenu, EditorMenuBubble } from 'tiptap'
import {
	Blockquote,
	CodeBlock,
	HardBreak,
	Heading,
	OrderedList,
	BulletList,
	ListItem,
	TodoItem,
	TodoList,
	Bold,
	Code,
	Italic,
	Link,
	Strike,
	Underline,
	History,
	Placeholder,
} from 'tiptap-extensions'

export default {
	name: 'Editor',
	components: {
		EditorContent,
		// EditorMenuBar,
		EditorFloatingMenu,
		EditorMenuBubble
	},
	props: {
		item: Object // DEFINE DEFAULT VALUE 
	},
	watch: {
		'item'() {
			this.editor.setContent(this.item.content);
			this.editor.focus();
		}
	},
	data() {
		return {
			editor: new Editor({
				extensions: [
					new Blockquote(),
					new BulletList(),
					new CodeBlock(),
					new HardBreak(),
					new Heading({ levels: [1, 2, 3] }),
					new ListItem(),
					new OrderedList(),
					new TodoItem(),
					new TodoList(),
					new Bold(),
					new Code(),
					new Italic(),
					new Link(),
					new Strike(),
					new Underline(),
					new History(),
					new Placeholder( {
						emptyClass: 'is-empty',
						emptyNodeText: 'Tell the world how awesome your project is ...',
					}),
				],
				content: this.item.content,
				onUpdate: ({getHTML}) => {
					this.html = getHTML();
					this.$emit('updated', this.html);
				}
			}),
			html: 'Loading...',
			linkUrl: null,
			linkMenuIsActive: false,
		}
	},
	methods: {
		showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
      this.editor.focus()
    },
	},
	beforeDestroy() {
		this.editor.destroy()
	},
}
</script>

<style lang="scss">
.menubar, .editor__floating-menu {
	.menubar__button {
		background: transparent;
		border: none;
		border-radius: 5px;
		&:hover {
			cursor: pointer;
			background-color: $dsgnr-light-color;
		}
		&.is-active {
			background-color: $dsgnr-medium-color;
		}
	}
}

.editor {
  position: relative;
  padding: .6rem 0rem;
  border-bottom: 1px solid $dsgnr-light-color;
  margin-bottom: 1.2rem;

  &__floating-menu {
		font-size: 1rem;
    position: absolute;
    margin-top: -0rem;
    visibility: hidden;
    opacity: 0;
    left: 2px;
    right: 0;
    background-color: $dsgnr-white-color;
    transition: opacity 0.2s, visibility 0.2s;

    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }


  .menububble {
	  position: absolute;
	  display: flex;
	  z-index: 20;
	  background: $dsgnr-black-color;
	  border-radius: 5px;
	  padding: 0.3rem .3rem;
	  margin-bottom: 0.5rem;
	  transform: translateX(-50%);
	  visibility: hidden;
	  opacity: 0;
	  transition: opacity 0.2s, visibility 0.2s;
	  &:before {
	  	position: absolute;
	  	bottom: -8px;
	  	left: calc(50% - 10px);
	  	content: "";
	  	width: 0;   height: 0; 
		  border-left: 10px solid transparent;
		  border-right: 10px solid transparent;
		  
		  border-top: 10px solid $dsgnr-black-color;

	  }

	  &.is-active {
	    opacity: 1;
	    visibility: visible;
	  }

	  &__button {
	    display: inline-flex;
	    background: transparent;
	    border: 0;
	    color: $dsgnr-medium-color;
	    padding: 0.2rem 0.5rem;
	    margin-right: 0.2rem;
	    border-radius: 2px;
	    cursor: pointer;

	    &:last-child {
	      margin-right: 0;
	    }

	    &:hover {
	      background-color: rgba($dsgnr-white-color, 0.1);
	      color: $dsgnr-white-color;
	    }

	    &.is-active {
	      background-color: rgba($dsgnr-white-color, 0.2);
	      color: $dsgnr-white-color;
	    }
	  }

	  &__form {
	    display: flex;
	    align-items: center;
	  }

	  &__input {
	    font: inherit;
	    border: none;
	    background: transparent;
	    color: $dsgnr-white-color;
	  }
	}

	p.is-empty:first-child::before {
	  content: attr(data-empty-text);
	  float: left;
	  color: $dsgnr-medium-color;
	  pointer-events: none;
	  height: 0;
	  font-style: italic;
	}

}

.editor__content {
	.ProseMirror {
		&:focus {outline: none;}
	}
	&:focus { outline: none; }
}

pre {
	padding: 0.7rem 1rem;
	border-radius: 5px;
	background: $dsgnr-black-color;
	color: $dsgnr-white-color;
	font-size: 0.8rem;
	overflow-x: auto;

	code {
		display: block;
	}
}

p code {
	display: inline-block;
	padding: 0 0.4rem;
	border-radius: 5px;
	font-size: 0.8rem;
	font-weight: bold;
	background: rgba($dsgnr-black-color, 0.1);
	color: rgba($dsgnr-black-color, 0.8);
}

li > p,
li > ol,
li > ul {
	margin: 0;
}

blockquote {
	border-left: 3px solid rgba($dsgnr-black-color, 0.1) !important;
	color: rgba($dsgnr-black-color, 0.8);
	padding-left: 0.8rem;
	font-style: italic;

	p {
		margin: 0;
	}
}

table {
	border-collapse: collapse;
	table-layout: fixed;
	width: 100%;
	margin: 0;
	overflow: hidden;

	td, th {
		min-width: 1em;
		border: 2px solid $dsgnr-medium-color;
		padding: 3px 5px;
		vertical-align: top;
		box-sizing: border-box;
		position: relative;
		> * {
			margin-bottom: 0;
		}
	}

	th {
		font-weight: bold;
		text-align: left;
	}

	.selectedCell:after {
		z-index: 2;
		position: absolute;
		content: "";
		left: 0; right: 0; top: 0; bottom: 0;
		background: rgba(200, 200, 255, 0.4);
		pointer-events: none;
	}

	.column-resize-handle {
		position: absolute;
		right: -2px; top: 0; bottom: 0;
		width: 4px;
		z-index: 20;
		background-color: #adf;
		pointer-events: none;
	}
}

.tableWrapper {
	margin: 1em 0;
	overflow-x: auto;
}

.resize-cursor {
	cursor: ew-resize;
	cursor: col-resize;
}

</style>