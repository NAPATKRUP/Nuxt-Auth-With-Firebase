<template>
  
</template>

<script>
export default {
  mounted() {
    this.$store
      .dispatch("users/logout")
      .then(() => {
        this.$router.push("/");
      })
  }
}
</script>
