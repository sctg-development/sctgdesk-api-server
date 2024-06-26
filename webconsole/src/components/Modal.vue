<!--
=========================================================
* © 2024 Ronan LE MEILLAT for SCTG Development
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" @close="modalCancel" class="relative z-10">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-fit md:min-w-1/3 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                {{ props.title }}
                            </DialogTitle>
                            <div class="mt-2">
                                <slot></slot>
                            </div>

                            <div class="mt-4">
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 m-1 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="modalOk">
                                    {{ props.okLabel }}
                                </button>
                                <button type="button"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-gray-100 m-1 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="modalCancel">
                                    {{ props.cancelLabel }}
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup lang="ts">
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const emit = defineEmits(['modalOk', 'modalCancel'])
const props = withDefaults(defineProps<{
    okLabel?: string;
    cancelLabel?: string;
    title: string;
}>(),
    {
        okLabel: 'Ok',
        cancelLabel: 'Cancel',
        title: '',
    })


/**
 * Emits the 'modalOk' event.
 *
 * @return {void}
 */
function modalOk(): void {
    emit('modalOk')
}

/**
 * Emits the 'modalCancel' event.
 *
 * @return {void}
 */
function modalCancel(): void {
    emit('modalCancel')
}
</script>