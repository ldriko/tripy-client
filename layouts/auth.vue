<template>
  <div class="min-h-screen flex">
    <div class="flex-grow bg-primary relative p-8">
      <div class="flex gap-4 items-center text-2xl text-white font-bold">
        <app-icon name="logo-white" />
        Tripy
      </div>
      <app-icon
        class="absolute w-1/2 bottom-0 right-0 z-10"
        name="login"
      />
      <span
        class="bg-primary-variant rounded-full w-[65%] aspect-square absolute -top-[20%] -right-[20%]"
      />
      <span
        class="bg-primary-variant rounded-full w-[65%] aspect-square absolute -bottom-[30%] -left-[20%]"
      />
    </div>
    <div class="flex-shrink-0 max-w-xl w-full p-10 bg-white z-10">
      <slot />
    </div>
  </div>
</template>
