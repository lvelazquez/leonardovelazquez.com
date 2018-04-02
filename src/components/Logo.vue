<template>
    <svg class="logo"  version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" :width="`${width}`" :height="`${height}`" viewBox="0 0 68.715 71.741" enable-background="new 0 0 68.715 71.741" xml:space="preserve">
                        <polygon id="svgLogo" class="logoLoader" points="68.354,0.556 32.797,55.055 67.115,55.055 67.115,71.741
	0,71.741 0.175,0.556 0.175,0 16.862,0 16.862,44.421 45.832,0.556 46.197,0 68.715,0 "/>
                    </svg>
</template>

<script>
export default {
  name: "Logo",
  props: {
    width: { type: String, default: "68.715px" },
    height: { type: String, default: "71.741px" }
  }
};
</script>
